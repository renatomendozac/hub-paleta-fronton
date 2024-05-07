import React, { useRef } from 'react'
import './auto-complete-input.css'

const maxLength = 5

const AutoCompleteInput = ({ name, placeholder, onChange, error, children }) => {
  const ref = useRef()

  const childrenNodes = Array.from(children)
    .filter((childNode) => {
      const value = ref.current?.value
      const inputVal = new RegExp(`${value}`.trim(), 'i')
      return value && inputVal.test(childNode.props.value)
    }).slice(0, maxLength)

  return (
    <div className="relative">
      <input
        className="block appearance-none w-full bg-white text-gray-700 border border-gray-400 hover:border-gray-500 focus:border-purple-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        list={`${name}-options`}
        autoComplete='off'
        ref={ref}
      />
      { error && <p className="text-red-500 text-xs italic">{error}</p>}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex mt-3 px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
      <datalist id={`${name}-options`}>
        {childrenNodes}
      </datalist>
    </div>
  )
}

export default AutoCompleteInput
