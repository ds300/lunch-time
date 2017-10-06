import * as React from "react"
import { observer } from "mobx-react"
import { observable, computed } from "mobx"
import "./App.css"
import { User, Venue, getVenueReports } from "./domain"
import { processUsers, processVenues } from "./data"
import SelectUsers from "./SelectUsers"
import Results from "./Results"
import { sortBy } from "lodash-es"

@observer
class App extends React.Component {
  @observable users: User[] | null = null

  @observable venues: Venue[] | null = null

  @observable error: boolean = false

  @observable selectingUsers: boolean = true

  @observable selectedUsers: User[] = []

  @computed
  get loading(): boolean {
    return this.users === null && this.venues === null
  }

  @computed
  get canViewReults(): boolean {
    return this.selectedUsers.length > 0
  }

  @computed
  get results() {
    return this.venues && getVenueReports(this.selectedUsers, this.venues)
  }

  componentDidMount() {
    fetch("./users.json")
      .then(res => res.json())
      .then(processUsers)
      .then(users => {
        this.users = sortBy(users, "name")
      })
      .catch(() => {
        this.error = true
      })
    fetch("./venues.json")
      .then(res => res.json())
      .then(processVenues)
      .then(venues => {
        this.venues = sortBy(venues, "name")
      })
      .catch(() => {
        this.error = true
      })
  }

  onSelectUser = (user: User) => {
    this.selectedUsers.push(user)
  }

  onDeselectUser = (user: User) => {
    this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1)
  }

  onViewResults = () => {
    this.selectingUsers = false
  }

  onSelectUsers = () => {
    this.selectingUsers = true
  }

  render() {
    return (
      <div className="App">
        {this.error ? (
          <div>error!</div>
        ) : this.loading ? (
          <div>loading...</div>
        ) : (
          <div>
            {this.selectingUsers && this.users ? (
              <SelectUsers
                users={this.users}
                selectedUsers={this.selectedUsers}
                onSelectUser={this.onSelectUser}
                onDeselectUser={this.onDeselectUser}
                onViewResults={this.onViewResults}
                canViewResults={this.canViewReults}
              />
            ) : (
              this.results && (
                <Results results={this.results} onGoBack={this.onSelectUsers} />
              )
            )}
          </div>
        )}
      </div>
    )
  }
}

export default App
