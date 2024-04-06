import Image from 'next/image'

const content = [
  {
    title: 'Torneo Metropolitano Villa 2023, semis, sub18, Paleta Frontón, Julián Portaro vs Santiago López',
    id: 'NlDpCXjxITU',
    platform: 'youtube'
  },
  {
    title: 'Torneo Metropolitano Villa 2023, semis, sub18, Paleta Frontón, Julián Portaro vs Santiago López',
    id: 'NlDpCXjxITU',
    platform: 'youtube'
  },
  {
    title: 'Torneo Metropolitano Villa 2023, semis, sub18, Paleta Frontón, Julián Portaro vs Santiago López',
    id: 'NlDpCXjxITU',
    platform: 'youtube'
  },
  {
    title: 'Torneo Metropolitano Villa 2023, semis, sub18, Paleta Frontón, Julián Portaro vs Santiago López',
    id: 'NlDpCXjxITU',
    platform: 'youtube'
  },
  {
    title: 'Torneo Metropolitano Villa 2023, semis, sub18, Paleta Frontón, Julián Portaro vs Santiago López',
    id: 'NlDpCXjxITU',
    platform: 'youtube'
  },
  {
    title: 'Torneo Metropolitano Villa 2023, semis, sub18, Paleta Frontón, Julián Portaro vs Santiago López',
    id: 'NlDpCXjxITU',
    platform: 'youtube'
  }
]

export default function Home () {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <h1>Hub - Videos de paleta fronton</h1>

      <ul className='grid grid-cols-1 gap-4 box-border list-none my-8 sm:grid-cols-2  md:grid-cols-3'>
        {
          content.map(({ title, id }) => (
            <li key={id}>
              <h1>{title}</h1>
              <Image alt={title} src={`https://img.youtube.com/vi/${id}/0.jpg`} width={500} height={500} />
            </li>
          ))
        }
      </ul>
    </main>
  )
}
