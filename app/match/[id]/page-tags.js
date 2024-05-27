'use client'

import Tag from '@/components/Tag'
import { FilterBy } from '@/utils/filter-by'
import { useRouter } from 'next/navigation'

const PageTags = ({ tags, isTcn, competition, categoryAcronym, players }) => {
  const router = useRouter()

  const fullTags = [
    ...tags.map((label) => ({ type: FilterBy.Tag, label })),
    (isTcn && ({ type: FilterBy.Tag, label: 'TCN' })),
    { type: FilterBy.Competition, label: competition },
    { type: FilterBy.Category, label: categoryAcronym },
    ...players.map(({ full_name: label }) => ({ type: FilterBy.Player, label }))
  ].filter(Boolean)

  return (
    <div className='mt-6 flex flex-wrap'>
      {fullTags.map(({ type, label }) => (
        <Tag
          key={`${type}-${label}`}
          label={label}
          onClick={() => router.push(`/${type}/${label}`, 'push')}
        />)
      )}
    </div>
  )
}

export default PageTags
