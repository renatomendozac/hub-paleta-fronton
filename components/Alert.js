import CircleCheckIcon from '@/icons/CircleCheckIcon'
import CircleXIcon from '@/icons/CircleXIcon'

const Alert = ({ type = 'error', children }) => {
  const [Icon, bgColor] = type === 'success'
    ? [CircleCheckIcon, 'bg-green-700']
    : [CircleXIcon, 'bg-red-700']

  return (
    <div className='fixed top-[-60px] left-0 w-full flex justify-center z-50 anirenat'>
      <div className={`w-full max-w-xs text-sm ${bgColor} text-stone-300 p-2 rounded-md`}>
        <Icon width={22} height={22} className="inline-block" />
        <span className='pl-1'>{children}</span>
      </div>
    </div>
  )
}

export default Alert
