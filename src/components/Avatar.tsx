import { authorColor, initials } from '../utils/authors'

interface AvatarProps {
  name: string
  colorId: number
  size?: 'sm' | 'md' | 'lg'
}

export default function Avatar({ name, colorId, size = 'md' }: AvatarProps) {
  const color = authorColor(colorId)

  return (
    <span
      className={`avatar avatar-${size}`}
      style={{ background: color.bg, color: color.on }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
