export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="error-box" role="alert">
      <p>⚠ {message}</p>
      <button className="btn btn-outline" onClick={() => window.location.reload()}>
        Tải lại trang
      </button>
    </div>
  )
}
