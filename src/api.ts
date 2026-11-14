import axios from 'axios'
import type { User, UsersResponse } from './types'

const BASE_URL =
  'https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464'

// Загружает список всех сотрудников.
// Выбрасывает ошибку, если сервер недоступен, вернул ошибку или неожиданный ответ.
export async function fetchUsers(): Promise<User[]> {
  const response = await axios.get<UsersResponse>(`${BASE_URL}/users`, {
    params: { __example: 'all' },
    timeout: 10000,
  })

  const items = response.data?.items
  if (!Array.isArray(items)) {
    throw new Error('Сервер вернул данные в неожиданном формате')
  }
  return items
}
