import Link from 'next/link'

const NotFound = () => (
  <div className='flex flex-col items-center my-20 gap-6'>
    <div className='text-center'>
      <h2 className='text-4xl mb-3'>¡Te has perdido!</h2>
      <span className='text-4xl'>😵‍💫😵‍💫😵‍💫</span>
    </div>
    <Link href="/" className='underline underline-offset-8'>Volver al inicio</Link>
  </div>
)

export default NotFound
