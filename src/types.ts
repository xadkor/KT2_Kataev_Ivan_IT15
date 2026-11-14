// Сотрудник в том виде, в каком его возвращает API
export interface User {
  id: string
  avatarUrl: string
  firstName: string
  lastName: string
  userTag: string
  department: string
  position: string
  birthday: string // дата в формате ГГГГ-ММ-ДД
  phone: string
}

// Ответ API: список лежит в поле items
export interface UsersResponse {
  items: User[]
}
