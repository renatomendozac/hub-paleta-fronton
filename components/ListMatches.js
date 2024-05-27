import Image from 'next/image'
import Link from 'next/link'
import { getThumbnail } from '@/utils/get-thumbnail'

const matchFields = 'id, title, platform, link'

const ListMatches = ({ matches }) => (
  <ul className='grid grid-cols-1 gap-6 list-none sm:grid-cols-2 md:grid-cols-3 items-end'>
      {
        matches.map(({ id, title, platform, link }) => (
          <li key={id}>
            <h1 className='mb-4'>{title}</h1>
            <Link href={`/match/${id}`}>
              <Image
                priority
                alt={title}
                src={getThumbnail(link, platform)}
                width={512}
                height={512}
              />
            </Link>
          </li>
        ))
      }
    </ul>
)

export { matchFields }
export default ListMatches
