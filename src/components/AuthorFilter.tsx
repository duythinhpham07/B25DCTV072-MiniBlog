import type { Author } from '../types'
import { firstName } from '../utils/authors'
import Avatar from './Avatar'

interface AuthorFilterProps {
  authors: Author[]
  selected: number
  onSelect: (id: number) => void
}

export default function AuthorFilter({ authors, selected, onSelect }: AuthorFilterProps) {
  return (
    <div className={selected ? 'author-filter has-selected' : 'author-filter'} role="group" aria-label="Lọc theo tác giả">
      <button className="author-chip" aria-pressed={selected === 0} onClick={() => onSelect(0)}>
        <span className="avatar avatar-lg avatar-all" aria-hidden="true">
          Tất cả
        </span>
        <span className="author-chip-name">Mọi người</span>
      </button>

      {authors.map((author) => (
        <button
          key={author.id}
          className="author-chip"
          aria-pressed={selected === author.id}
          title={author.name}
          onClick={() => onSelect(selected === author.id ? 0 : author.id)}
        >
          <Avatar name={author.name} colorId={author.id} size="lg" />
          <span className="author-chip-name">{firstName(author.name)}</span>
        </button>
      ))}
    </div>
  )
}
