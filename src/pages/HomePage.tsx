import { useMemo, useState } from 'react'
import { ErrorScreen } from '../components/ErrorScreen'
import { SkeletonList } from '../components/SkeletonList'
import { UserCard } from '../components/UserCard'
import { departmentLabel } from '../departments'
import { useUsers } from '../useUsers'

type SortMode = 'alphabet' | 'birthday'

export function HomePage() {
  const { status, users, reload } = useUsers()

  const [search, setSearch] = useState('')
  const [activeDepartment, setActiveDepartment] = useState('all')
  const [sortMode, setSortMode] = useState<SortMode>('alphabet')

  // Получаем список отделов из загруженных сотрудников
  const departments = useMemo(() => {
    return Array.from(new Set(users.map((user) => user.department))).sort(
      (a, b) => departmentLabel(a).localeCompare(departmentLabel(b), 'ru'),
    )
  }, [users])

  // Фильтруем и сортируем сотрудников
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()

    const result = users.filter((user) => {
      const fullName =
        `${user.firstName} ${user.lastName} ${user.userTag}`.toLowerCase()

      const matchesSearch = fullName.includes(query)
      const matchesDepartment =
        activeDepartment === 'all' ||
        user.department === activeDepartment

      return matchesSearch && matchesDepartment
    })

    return [...result].sort((a, b) => {
      if (sortMode === 'alphabet') {
        return `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`,
          'ru',
        )
      }

      // Сортировка по ближайшему дню рождения
      const getNextBirthday = (birthday: string) => {
        const [, month, day] = birthday.split('-').map(Number)
        const today = new Date()
        const currentYear = today.getFullYear()

        let date = new Date(currentYear, month - 1, day)
        date.setHours(0, 0, 0, 0)

        const todayDate = new Date(
          currentYear,
          today.getMonth(),
          today.getDate(),
        )

        if (date < todayDate) {
          date = new Date(currentYear + 1, month - 1, day)
        }

        return date.getTime()
      }

      return getNextBirthday(a.birthday) - getNextBirthday(b.birthday)
    })
  }, [users, search, activeDepartment, sortMode])

  return (
    <main className="page">
      <h1 className="page__title">Сотрудники</h1>

      {status === 'loading' && <SkeletonList />}

      {status === 'error' && <ErrorScreen onRetry={reload} />}

      {status === 'success' && (
        <>
          <input
            className="search-input"
            type="search"
            placeholder="Введи имя, фамилию или никнейм"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="department-tabs">
            <button
              className={`department-tab ${
                activeDepartment === 'all' ? 'department-tab--active' : ''
              }`}
              onClick={() => setActiveDepartment('all')}
            >
              Все
            </button>

            {departments.map((department) => (
              <button
                key={department}
                className={`department-tab ${
                  activeDepartment === department
                    ? 'department-tab--active'
                    : ''
                }`}
                onClick={() => setActiveDepartment(department)}
              >
                {departmentLabel(department)}
              </button>
            ))}
          </div>

          <div className="list-toolbar">
            <span className="users-count">
              Найдено: {filteredUsers.length}
            </span>

            <select
              className="sort-select"
              value={sortMode}
              onChange={(event) =>
                setSortMode(event.target.value as SortMode)
              }
              aria-label="Сортировка сотрудников"
            >
              <option value="alphabet">По алфавиту</option>
              <option value="birthday">По дню рождения</option>
            </select>
          </div>

          {filteredUsers.length > 0 ? (
            <div>
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <div className="empty-results__title">
                Ничего не найдено
              </div>
              <p>Попробуй изменить запрос или выбрать другой отдел</p>
            </div>
          )}
        </>
      )}
    </main>
  )
}