import React, { Component } from 'react';
import axios from "axios";

export default class FoodAndBeverages extends Component {

  state = {
    services: []
}

componentDidMount() {
    axios.get("http://localhost:6001/api/services/food-and-beverages")
    .then(response => {
        this.setState({services: response.data})
    })
}

render() {
    return (
      <div className="row row-cols-1 row-cols-md-6 g-4 p-2">
        {this.state.services.map(service =>   
        <div className="col" key={service._id}>      
          <div className="card h-100 ml-1">
            <img className="card-img-top" src={service.images[0]} alt={service.name} />
            <div className="card-body">
              <h5 className="card-title">{service.name}</h5>
              <p className="card-text">{service.cityName}</p>
            </div>
          </div>
        </div>
        )}
    </div>
    );
  }
}