import React, { Component } from 'react';
import axios from "axios";

export default class Music extends Component {

  state = {
    services: []
}

componentDidMount() {
    axios.get("http://localhost:6001/api/services/music")
    .then(response => {
        this.setState({services: response.data})
    })
}

render() {
    return (
        <div>
          <h1>Music</h1>
            {this.state.services.map(service => <h2 key={service._id}>{service.name}</h2>)}
        </div>
    );
  }
}