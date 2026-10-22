import { useEffect, useState } from 'react'

export default function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(url !== null)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (url === null) return

    let ignore = false

    async function fetchData(url: string) {
      setLoading(true)
      setError(null)
      setNotFound(false)
      try {
        const res = await fetch(url)
        if (res.status === 404) {
          if (!ignore) setNotFound(true)
          return
        }
        if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}.`)
        const json: T = await res.json()
        if (!ignore) setData(json)
      } catch (err) {
        if (ignore) return
        if (err instanceof TypeError) {
          setError('Không kết nối được tới máy chủ, hãy kiểm tra mạng.')
        } else {
          setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra.')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchData(url)

    return () => {
      ignore = true
    }
  }, [url])

  return { data, loading: url !== null && loading, error, notFound }
}
