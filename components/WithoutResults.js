'use client'

const { useRouter } = require('next/navigation')

const WithoutResults = ({ title }) => {
  const router = useRouter()

  return (
    <div className='flex flex-col items-center my-20 gap-6'>
      <div className='text-center'>
        <h2 className='text-4xl mb-3'>{title}</h2>
        <span className='text-4xl'>📭</span>
      </div>
      <button
        className='underline underline-offset-8 cursor-pointer'
        onClick={() => router.back()}
      >
        Volver atrás
      </button>
    </div>
  )
}

export default WithoutResults
