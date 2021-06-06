import React, { Component } from 'react';
import axios from "axios";

export default class Venues extends Component {

  state = {
    venues: []
}

componentDidMount() {
    axios.get("http://localhost:6001/api/services/venues")
    .then(response => {
        this.setState({venues: response.data})
    })
}

render() {
    return (
        <div>
          <h1>Venues</h1>
            {this.state.venues.map(venue => <h2 key={venue._id}>{venue.name}</h2>)}
        </div>
    );
  }
}
