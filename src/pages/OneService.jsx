import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"

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
      <div className="m-3">
        <h1>{this.state.service.name}</h1>

        <div className="row row-cols-1 row-cols-md-3 g-4">
        {this.state.service.images.map((image) => {
          return (
              <div className="col">
                <div className="card">
                  <img src={image} className="card-img-top" alt="" />
                </div>
              </div>
          )
        })}
        </div>
        
        <div className="card border-primary mb-3 mx-auto mt-3" style={{maxWidth: "70rem"}}>
          <div className="card-header">The Details</div>
          <div className="card-body">
            <h4 className="card-title">{this.state.service.description}</h4>
            <p className="card-text">{this.state.service.cityName}</p>
            <p className="card-text">Cost: ${this.state.service.price}</p>
            <p className="card-text">Duration: {this.state.service.durationHrs} hours</p>
            <p className="card-text">Provided by: <Link to={`/vendor/${this.state.service.vendorId._id}`}>{this.state.service.vendorId.firstName}</Link></p>
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>

        
      </div>

    );
  }
}
