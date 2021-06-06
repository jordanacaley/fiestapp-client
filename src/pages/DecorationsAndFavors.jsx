import React, { Component } from 'react';
import axios from "axios";

export default class DecorationsAndFavors extends Component {

  state = {
    services: []
}

componentDidMount() {
    axios.get("http://localhost:6001/api/services/decorations-and-favors")
    .then(response => {
        this.setState({services: response.data})
    })
}

render() {
    return (
        <div>
          <h1>Decorations & Favors</h1>
            {this.state.services.map(service => <h2 key={service._id}>{service.name}</h2>)}
        </div>
    );
  }
}