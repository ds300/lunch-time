import * as React from "react"
import { VenueReport, UserVenueReport } from "./domain"
import { observer } from "mobx-react"
import { computed } from "mobx"

import "./Results.css"
@observer
class Results extends React.Component<{
  results: VenueReport[]
  onGoBack(): void
}> {
  @computed
  get safeVenueNames(): string[] {
    return this.props.results
      .filter(({ unhappyUserReports }) => unhappyUserReports.length === 0)
      .map(({ venueName }) => venueName)
  }

  @computed
  get unsafeVenues(): VenueReport[] {
    return this.props.results.filter(
      ({ unhappyUserReports }) => unhappyUserReports.length > 0,
    )
  }

  renderUnhappyUserReport = ({ name, canEat, canDrink }: UserVenueReport) =>
    `${name} doesn't like the ${!canEat && !canDrink
      ? "food or the drink :("
      : !canEat ? "food." : "drinks."}`

  render() {
    return (
      <div className="Results">
        {this.safeVenueNames.length > 0 && (
          <div>
            <h1>These are good</h1>
            <ul>
              {this.safeVenueNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        )}
        {this.unsafeVenues.length > 0 && (
          <div>
            <h1>Avoid these</h1>
            <ul>
              {this.unsafeVenues.map(
                ({ venueName, unhappyUserReports }, index) => (
                  <li key={index}>
                    {venueName}
                    <ul>
                      {unhappyUserReports.map((unhappyUserReport, index) => (
                        <li key={index}>
                          {this.renderUnhappyUserReport(unhappyUserReport)}
                        </li>
                      ))}
                    </ul>
                  </li>
                ),
              )}
            </ul>
          </div>
        )}
        <button onClick={this.props.onGoBack}>Choose different peeps</button>
      </div>
    )
  }
}

export default Results
