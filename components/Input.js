const Input = ({
  label,
  name,
  placeholder,
  onChange,
  type = 'text',
  additionalInformation = null,
  error = null,
  defaultValue
}) => (
  <div className="md:flex md:items-baseline mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={name}>
        {label}
      </label>
    </div>
    <div className="md:w-2/3">
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        autoComplete="off"
      />
      { error && <p className="text-red-500 text-xs italic">{error}</p>}
      { additionalInformation && <p className="text-gray-600 text-xs italic mt-1 break-words">{additionalInformation}</p> }
    </div>
  </div>
)

export default Input
