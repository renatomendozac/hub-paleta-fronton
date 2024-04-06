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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hub - Videos de paleta fronton

      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '2rem' }}>
        {
          content.map(({ title, id }) => (
            <li key="title">
              <h1>{title}</h1>
              <img src={`https://img.youtube.com/vi/${id}/0.jpg`}></img>
              {/* <iframe
                src={link}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              /> */}
            </li>
          ))
        }
      </ul>
    </main>
  )
}
