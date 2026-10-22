import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { addLocalPost } from '../utils/localPosts'

interface FormErrors {
  title?: string
  body?: string
}

const TITLE_MIN = 5
const TITLE_MAX = 100
const BODY_MIN = 20

function validate(title: string, body: string) {
  const errors: FormErrors = {}

  if (!title) errors.title = 'Vui lòng nhập tiêu đề.'
  else if (title.length < TITLE_MIN) errors.title = `Tiêu đề phải có ít nhất ${TITLE_MIN} ký tự.`
  else if (title.length > TITLE_MAX) errors.title = `Tiêu đề không được quá ${TITLE_MAX} ký tự.`

  if (!body) errors.body = 'Vui lòng nhập nội dung.'
  else if (body.length < BODY_MIN) errors.body = `Nội dung phải có ít nhất ${BODY_MIN} ký tự.`

  return errors
}

export default function NewPostPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newErrors = validate(title.trim(), body.trim())
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    addLocalPost({
      id: Date.now(),
      userId: 0,
      title: title.trim(),
      body: body.trim(),
      author: user?.username,
      createdAt: new Date().toISOString(),
    })

    sessionStorage.removeItem('miniblog_page')
    sessionStorage.removeItem('miniblog_keyword')
    navigate('/', { state: { message: 'Đăng bài thành công!' } })
  }

  return (
    <div className="form-page">
      <h1>Viết bài mới</h1>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="title">Tiêu đề</label>
        <input
          id="title"
          value={title}
          className={errors.title ? 'invalid' : ''}
          onChange={(e) => {
            setTitle(e.target.value)
            setErrors({ ...errors, title: undefined })
          }}
        />
        <div className="field-footer">
          <span className="field-error">{errors.title}</span>
          <span className={title.trim().length > TITLE_MAX ? 'counter over' : 'counter'}>
            {title.trim().length}/{TITLE_MAX}
          </span>
        </div>

        <label htmlFor="body">Nội dung</label>
        <textarea
          id="body"
          rows={8}
          value={body}
          className={errors.body ? 'invalid' : ''}
          onChange={(e) => {
            setBody(e.target.value)
            setErrors({ ...errors, body: undefined })
          }}
        />
        <div className="field-footer">
          <span className="field-error">{errors.body}</span>
          <span className="counter">{body.trim().length} ký tự</span>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn">
            Đăng bài
          </button>
          <Link to="/" className="btn btn-outline">
            Hủy
          </Link>
        </div>
      </form>
    </div>
  )
}
