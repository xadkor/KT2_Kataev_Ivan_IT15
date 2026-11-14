import { Link } from 'react-router-dom'
import { departmentLabel } from '../departments'
import type { User } from '../types'
import { Avatar } from './Avatar'

interface Props {
  user: User
}

// Строка списка: фото, имя, никнейм и департамент
export function UserCard({ user }: Props) {
  return (
    <Link className="user-card" to={`/user/${user.id}`}>
      <Avatar user={user} />
      <div className="user-card__info">
        <div className="user-card__name">
          <span>
            {user.firstName} {user.lastName}
          </span>
          <span className="user-card__tag">{user.userTag.toLowerCase()}</span>
        </div>
        <div className="user-card__department">
          {departmentLabel(user.department)}
        </div>
      </div>
    </Link>
  )
}
