import { ErrorScreen } from '../components/ErrorScreen'
import { SkeletonList } from '../components/SkeletonList'
import { UserCard } from '../components/UserCard'
import { useUsers } from '../useUsers'

export function HomePage() {
  const { status, users, reload } = useUsers()

  return (
    <main className="page">
      <h1 className="page__title">Сотрудники</h1>

      {status === 'loading' && <SkeletonList />}
      {status === 'error' && <ErrorScreen onRetry={reload} />}
      {status === 'success' && (
        <div>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </main>
  )
}
