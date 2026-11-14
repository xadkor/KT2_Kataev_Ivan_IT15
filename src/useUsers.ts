import { useEffect, useState } from 'react'
import { fetchUsers } from './api'
import type { User } from './types'

export type LoadStatus = 'loading' | 'error' | 'success'

interface State {
  status: LoadStatus
  users: User[]
}

// Загружает сотрудников при открытии и умеет повторять загрузку
export function useUsers() {
  const [state, setState] = useState<State>({ status: 'loading', users: [] })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetchUsers()
      .then((users) => {
        if (!cancelled) setState({ status: 'success', users })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', users: [] })
      })

    // Если компонент закрыли раньше, чем пришёл ответ, результат не нужен
    return () => {
      cancelled = true
    }
  }, [attempt])

  // «Попробовать снова»: показываем загрузку и запускаем запрос заново
  function reload() {
    setState({ status: 'loading', users: [] })
    setAttempt((n) => n + 1)
  }

  return { ...state, reload }
}
