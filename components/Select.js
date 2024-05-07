const Select = ({ label, name, children, defaultValue, value, onChange, error }) => (
  <div className="md:flex md:items-baseline mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={name}>
        {label}
      </label>
    </div>
    <div className="md:w-2/3 inline-block relative w-full">
      <select
        className="block appearance-none w-full bg-white text-gray-700 border border-gray-400 hover:border-gray-500 focus:border-purple-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        name={name}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex mt-3 px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
      { error && <p className="text-red-500 text-xs italic">{error}</p> }
    </div>
  </div>
)

export default Select
