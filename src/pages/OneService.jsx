import React, { Component } from 'react';
import axios from "axios";

export default class OneService extends Component {
  
  state = {
    service: null,
  }

  componentDidMount() {
    const serviceId = this.props.match.params.id;

    axios
    .get("http://localhost:6001/api/services/" + serviceId)
    .then(response => {
      this.setState({service: response.data})
    })
    .catch((error) => {
      console.log(error);
    })

  }

  render() {
    if (!this.state.service) return null;

    return (
      <div className="row row-cols-1 row-cols-md-1 g-4 p-2">
        <div className="col" key={this.state.service._id}>
          <div className="card h-100 ml-1">
            <img className="card-img-top" src={this.state.service.images[0]} alt={this.state.service.name} />
            <div className="card-body">
              <h5 className="card-title">{this.state.service.name}</h5>
              <p className="card-text">{this.state.service.description}</p>
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}

