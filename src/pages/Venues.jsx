import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"

export default class Venues extends Component {

  state = {
    services: []
}

componentDidMount() {
    axios.get("http://localhost:6001/api/services/venues")
    .then(response => {
        this.setState({services: response.data})
    })
}

render() {
    return (
      <div className="m-3">
        <h1>Venues</h1>
        <div className="row row-cols-1 row-cols-md-4 g-4 p-2">
          {this.state.services.map(service =>   
          <div className="col" key={service._id}>      
            <div className="card h-100 ml-1">
              <img className="card-img-top" src={service.images[0]} alt={service.name} />
              <div className="card-body">
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.cityName}</p>
                <Link to={`service/${service._id}`} className="btn btn-primary" type="button">Learn more</Link>
              </div>
            </div>
          </div>
          )}
      </div>
      </div>
    );
  }
}
