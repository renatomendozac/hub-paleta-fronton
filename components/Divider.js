const Divider = ({ children }) => (
  <div className="flex items-center my-4">
    <div className="flex-grow border-t border-gray-700" />
    {children}
    <div className="flex-grow border-t border-gray-700" />
  </div>
)

export default Divider
