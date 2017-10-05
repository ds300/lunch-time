import * as React from "react"
import { observer } from "mobx-react"
import { observable, computed } from "mobx"
import "./App.css"
import { User, Venue, getVenueReports } from "./domain"
import { processUsers, processVenues } from "./data"

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
  get canShowResults(): boolean {
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
        this.users = users
      })
      .catch(() => {
        this.error = true
      })
    fetch("./venues.json")
      .then(res => res.json())
      .then(processVenues)
      .then(venues => {
        this.venues = venues
      })
      .catch(() => {
        this.error = true
      })
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
            <button
              onClick={() => {
                if (this.users) {
                  this.selectedUsers = this.users
                }
              }}
            >
              click me
            </button>
            <div>{JSON.stringify(this.results)}</div>
          </div>
        )}
      </div>
    )
  }
}

export default App
