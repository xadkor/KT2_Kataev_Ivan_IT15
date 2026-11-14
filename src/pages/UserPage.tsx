import { Link, useParams } from 'react-router-dom'
import { ErrorScreen } from '../components/ErrorScreen'
import { SkeletonList } from '../components/SkeletonList'
import { Avatar } from '../components/Avatar'
import { departmentLabel } from '../departments'
import { useUsers } from '../useUsers'

export function UserPage() {
  const { id } = useParams()
  const { status, users, reload } = useUsers()

  if (status === 'loading') {
    return (
      <main className="page">
        <SkeletonList />
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className="page">
        <ErrorScreen onRetry={reload} />
      </main>
    )
  }

  const user = users.find((item) => item.id === id)

  if (!user) {
    return (
      <main className="page">
        <Link className="back-link" to="/">← К списку сотрудников</Link>
        <div className="empty-results">
          <div className="empty-results__title">Сотрудник не найден</div>
          <p>Возможно, ссылка устарела</p>
        </div>
      </main>
    )
  }

  const birthday = new Date(`${user.birthday}T00:00:00`).toLocaleDateString(
    'ru-RU',
    { day: 'numeric', month: 'long', year: 'numeric' },
  )

  return (
    <main className="page">
      <Link className="back-link" to="/">
        ← К списку сотрудников
      </Link>

      <section className="user-details">
        <Avatar user={user} />

        <h1 className="page__title">
          {user.firstName} {user.lastName}
        </h1>

        <p className="user-details__tag">@{user.userTag.toLowerCase()}</p>
        <p className="user-details__position">{user.position}</p>
        <p className="user-details__department">
          {departmentLabel(user.department)}
        </p>
      </section>

      <section className="user-details__info">
        <h2>Контактная информация</h2>

        <div className="user-details__row">
          <span>Телефон</span>
          <a href={`tel:${user.phone}`}>{user.phone}</a>
        </div>

        <div className="user-details__row">
          <span>День рождения</span>
          <span>{birthday}</span>
        </div>
      </section>
    </main>
  )
}