const Message = ({ type = 'warning', children }) => {
  const className = type === 'info'
    ? 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400'
    : type === 'danger'
      ? 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400'
      : type === 'success'
        ? 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400'
        : 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300'

  return (
    <div className={`p-4 m-auto mb-4 text-sm rounded-lg ${className} max-w-[512px]`} role="alert">
      <span className="font-medium text-center">
        {children}
      </span>
    </div>
  )
}

export default Message
