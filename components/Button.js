const Button = ({ onClick, disabled, children }) => (
  <div className="md:flex md:items-center">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button
        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  </div>
)

export default Button
