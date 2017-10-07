import * as React from "react"
import { User } from "./domain"
import { observer } from "mobx-react"

import "./SelectUsers.css"

@observer
class SelectUsers extends React.Component<{
  users: User[]
  selectedUsers: User[]
  onSelectUser(user: User): void
  onDeselectUser(user: User): void
  onViewResults(): void
  canViewResults: boolean
}> {
  render() {
    const {
      users,
      selectedUsers,
      onSelectUser,
      onDeselectUser,
      onViewResults,
      canViewResults,
    } = this.props
    return (
      <div className="SelectUsers">
        <h1>Who's for lunch?</h1>
        <ul>
          {users.map((user, index) => {
            const selected = selectedUsers.includes(user)
            const onClick = selected ? onDeselectUser : onSelectUser
            return (
              <li
                key={index}
                className={selected ? "active" : ""}
                onMouseDown={ev => {
                  // prevent focus from changing when clicking
                  ev.preventDefault()
                }}
                onMouseUp={onClick.bind(null, user)}
                onKeyPress={onClick.bind(null, user)}
                tabIndex={0}
                role="button"
              >
                {user.name}
                {selected ? " is coming!" : ""}
              </li>
            )
          })}
        </ul>
        <button disabled={!canViewResults} onClick={onViewResults}>
          Show options
        </button>
      </div>
    )
  }
}

export default SelectUsers
