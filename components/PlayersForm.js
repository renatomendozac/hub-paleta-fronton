import AutoCompleteInput from './AutoComplete/AutoCompleteInput'

const PlayersForm = ({ isSingle, handlePlayers, players, errors }) => {
  const onChange = ({ target }) => {
    handlePlayers({ [target.name]: target.value })
  }

  return (
    <div className="md:flex md:items-baseline mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="first-player">
        * Jugadores:
      </label>
    </div>
    <div className="md:w-2/3">
      <div className='flex flex-row gap-2 items-baseline'>
        <AutoCompleteInput
          name="first"
          placeholder="Nombre Apellido"
          onChange={onChange}
          error={errors.firstPlayer}
        >
          {players.map(({ id, full_name: fullName }) => <option key={id} value={fullName} />)}
        </AutoCompleteInput>
        { isSingle ? 'vs' : '&' }
        <AutoCompleteInput
          name="second"
          placeholder="Nombre Apellido"
          onChange={onChange}
          error={errors.secondPlayer}
        >
          {players.map(({ id, full_name: fullName }) => <option key={id} value={fullName} />)}
        </AutoCompleteInput>
      </div>
      {
        !isSingle && (
          <>
            <p className='my-2 text-center'>vs</p>
            <div className='flex flex-row gap-2 items-baseline'>
              <AutoCompleteInput
                name="third"
                placeholder="Nombre Apellido"
                onChange={onChange}
                error={errors.thirdPlayer}
              >
                {players.map(({ id, full_name: fullName }) => <option key={id} value={fullName} />)}
              </AutoCompleteInput>
              &
              <AutoCompleteInput
                name="fourth"
                placeholder="Nombre Apellido"
                onChange={onChange}
                error={errors.fourPlayer}
              >
                {players.map(({ id, full_name: fullName }) => <option key={id} value={fullName} />)}
              </AutoCompleteInput>
            </div>
          </>
        )
      }
    </div>
  </div>
  )
}

export default PlayersForm
