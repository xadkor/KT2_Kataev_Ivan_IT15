import { useState } from 'react'
import type { User } from '../types'

interface Props {
  user: User
  size?: number
}

// Фото сотрудника. Если картинка не загрузилась, показываем инициалы.
export function Avatar({ user, size = 72 }: Props) {
  const [failed, setFailed] = useState(false)
  const initials = `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`
  const style = { width: size, height: size }

  if (failed || !user.avatarUrl) {
    return (
      <div
        className="avatar avatar--fallback"
        style={{ ...style, fontSize: size / 3 }}
        aria-hidden="true"
      >
        {initials}
      </div>
    )
  }

  return (
    <img
      className="avatar"
      style={style}
      src={user.avatarUrl}
      alt=""
      onError={() => setFailed(true)}
    />
  )
}
