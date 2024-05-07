import RadioButton from './RadioButton'

const RadioGroup = ({ label, name, options, onChange, defaultValue = '' }) => (
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={name}>
        {label}
      </label>
    </div>
    <div className="md:w-2/3 flex">
      {
        options.map(({ label, value }) => (
          <RadioButton
            key={value}
            label={label}
            name={name}
            value={value}
            className='flex-1'
            onChange={onChange}
            defaultChecked={value === defaultValue}
          />
        ))
      }
    </div>
  </div>
)

export default RadioGroup
