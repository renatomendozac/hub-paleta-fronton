const RadioButton = ({ label, name, value, onChange, defaultChecked = false, className = '' }) => (
  <div className={`md:flex md:items-center ${className}`}>
    <label className="block text-gray-500 font-bold">
      <input
        className="mr-2 leading-tight"
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <span className="text-sm">
        {label}
      </span>
    </label>
  </div>
)

export default RadioButton
