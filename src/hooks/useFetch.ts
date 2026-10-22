import { useEffect, useState } from 'react'

interface FetchResult<T> {
  url: string | null
  data: T | null
  error: string | null
  notFound: boolean
}

export default function useFetch<T>(url: string | null) {
  const [result, setResult] = useState<FetchResult<T>>({
    url: null,
    data: null,
    error: null,
    notFound: false,
  })

  useEffect(() => {
    if (url === null) return

    let ignore = false

    async function fetchData(url: string) {
      try {
        const res = await fetch(url)
        if (res.status === 404) {
          if (!ignore) setResult({ url, data: null, error: null, notFound: true })
          return
        }
        if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}.`)
        const json: T = await res.json()
        if (!ignore) setResult({ url, data: json, error: null, notFound: false })
      } catch (err) {
        if (ignore) return
        let message = err instanceof Error ? err.message : 'Đã có lỗi xảy ra.'
        if (err instanceof TypeError) message = 'Không kết nối được tới máy chủ, hãy kiểm tra mạng.'
        setResult({ url, data: null, error: message, notFound: false })
      }
    }

    fetchData(url)

    return () => {
      ignore = true
    }
  }, [url])

  const done = result.url === url

  return {
    data: done ? result.data : null,
    loading: url !== null && !done,
    error: done ? result.error : null,
    notFound: done && result.notFound,
  }
}
