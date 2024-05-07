import AutoCompleteInput from './AutoCompleteInput'

const AutoComplete = ({
  label,
  name,
  placeholder,
  onChange,
  children,
  error = null
}) => {
  return (
    <div className="md:flex md:items-baseline mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={name}>
        {label}
      </label>
    </div>
    <div className="md:w-2/3">
      <AutoCompleteInput
        name={name}
        error={error}
        onChange={onChange}
        placeholder={placeholder}
      >
        {children}
      </AutoCompleteInput>
    </div>
  </div>
  )
}

export default AutoComplete
