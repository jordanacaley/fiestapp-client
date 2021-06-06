import React, { Component } from 'react';
import axios from "axios";

export default class Entertainment extends Component {

  state = {
    services: []
}

componentDidMount() {
    axios.get("http://localhost:6001/api/services/entertainment")
    .then(response => {
        this.setState({services: response.data})
    })
}

render() {
    return (
        <div>
          <h1>Entertainment</h1>
            {this.state.services.map(service => <h2 key={service._id}>{service.name}</h2>)}
        </div>
    );
  }
}