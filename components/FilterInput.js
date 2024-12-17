'use client'

import { useState } from 'react'
import FilterOffIcon from '@/icons/FilterOff'
import FilterOnIcon from '@/icons/FilterOn'
import { getListCompetitions } from '@/services/get-competition-by-acronym'
import { getListPlayers } from '@/services/player'
import { getListCategory } from '@/services/category'
import Divider from './Divider'

const width = 18
const height = 18

const filterByOptions = [
  { label: 'Competencia', value: 'competition' },
  { label: 'Categoría', value: 'category' },
  { label: 'Jugador', value: 'player' }
]

const Select = ({ className, name, defaultValue, onChange, children }) => (
  <div className={`relative min-w-40 max-w-md ${className}`}>
    <select
      className="block appearance-none w-full bg-white text-gray-700 border border-gray-400 hover:border-gray-500 focus:border-purple-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      defaultValue={defaultValue}
      name={name}
      onChange={onChange}
    >
      {children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex mt-3 px-2 text-gray-700">
      <svg
        className="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
      </svg>
    </div>
  </div>
)

const FilterInput = () => {
  const [isOpen, setIsOpen] = useState(null)
  const [filterBy, setFilterBy] = useState(filterByOptions.at(0).value)
  const [options, setOptions] = useState([])

  const openFilter = () => {
    const shouldOpen = !isOpen
    if (shouldOpen) {
      onChangeFilterBy(filterBy)
    }

    setIsOpen(shouldOpen)
  }

  const onChangeFilterBy = async (filterBySelected) => {
    let result = []

    switch (filterBySelected) {
      case filterByOptions.at(0).value:
        result = await getListCompetitions('id, name')
        break
      case filterByOptions.at(1).value:
        result = await getListCategory('id, name')
        break
      case filterByOptions.at(2).value:
        result = (await getListPlayers('id, full_name'))
          .map(({ id, full_name: name }) => ({ id, name }))
        break
    }

    setOptions(result)
    setFilterBy(filterBySelected)
  }

  return (
    <div>
      <Divider>
        <div
          className='mx-4 min-w-28 inline-flex gap-1 justify-center items-center cursor-pointer text-gray-500'
          onClick={openFilter}
        >
          <p className='text-sm'>
            {isOpen ? 'Cerrar' : 'Abrir'} filtro
          </p>
          {
            isOpen
              ? <FilterOffIcon width={width} height={height} />
              : <FilterOnIcon width={width} height={height} />
          }
        </div>
      </Divider>
      {isOpen !== null && (
        <div className={isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}>
          <div className='flex justify-center items-center flex-col md:flex-row gap-2'>
            <Select
              name="filterBy"
              defaultValue={filterBy}
              onChange={({ target }) => onChangeFilterBy(target.value)}
            >
              {filterByOptions.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
            <Select name="option" defaultValue="0" className="w-72">
              <option key="0" value="0" disabled>Selecciona una opcion</option>
              {options.map(({ id, name }) => (
                <option key={id} value={name}>{name}</option>
              ))}
            </Select>
          </div>
          <hr className='w-[80%] m-auto mt-5 border-gray-700' />
        </div>
      )}
    </div>
  )
}

export default FilterInput
