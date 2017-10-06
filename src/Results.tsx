import * as React from "react"
import { VenueReport } from "./domain"
import { observer } from "mobx-react"

@observer
class Results extends React.Component<{
  results: VenueReport[]
  onGoBack(): void
}> {
  render() {
    return (
      <div>
        <h1>Go here</h1>
        <h1>Avoid here</h1>
        <button onClick={this.props.onGoBack}>&laquo;&laquo; Go back</button>
      </div>
    )
  }
}

export default Results
