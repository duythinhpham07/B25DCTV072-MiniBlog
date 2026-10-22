export interface AuthorColor {
  bg: string
  on: string
}

const INK = '#1b1f3b'
const WHITE = '#ffffff'

const COLORS: AuthorColor[] = [
  { bg: '#ff6b4a', on: INK },
  { bg: '#3d5afe', on: WHITE },
  { bg: '#ffb627', on: INK },
  { bg: '#12a383', on: INK },
  { bg: '#9b3fd0', on: WHITE },
  { bg: '#ff8fc0', on: INK },
  { bg: '#2bb3e0', on: INK },
  { bg: '#a7d129', on: INK },
  { bg: '#0e7c86', on: WHITE },
  { bg: '#8a5a3b', on: WHITE },
]

const OWN_COLOR: AuthorColor = { bg: INK, on: '#f5f6f8' }

export function authorColor(userId: number): AuthorColor {
  if (userId <= 0) return OWN_COLOR
  return COLORS[(userId - 1) % COLORS.length]
}

function nameWords(name: string) {
  return name.split(' ').filter((w) => w && !w.endsWith('.'))
}

export function initials(name: string) {
  const words = nameWords(name)
  const first = words[0]?.[0] ?? '?'
  const last = words.length > 1 ? words[words.length - 1][0] : ''
  return (first + last).toUpperCase()
}

export function firstName(name: string) {
  return nameWords(name)[0] ?? name
}
