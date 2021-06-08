import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"

export default class VendorDisplay extends Component {
  
  state = {
    vendor: null,
    vendorServices: [],
  }

  componentDidMount() {
    const vendorId = this.props.match.params.id;

    const promises = Promise.all([
      axios
        .get("http://localhost:6001/api/vendors/" + vendorId)
        .then((res) => res.data)
        .catch((error) => {
          console.log(error);
        }),

        axios
        .get("http://localhost:6001/api/services/vendor/" + vendorId)
        .then((res) => res.data)
        .catch((error) => {
          console.log(error);
        }),

    ]);

    promises.then((allPromises) => {
      const vendor = allPromises[0];
      const vendorServices = allPromises[1];

      this.setState({
        vendor: vendor,
        vendorServices: vendorServices,
      });
    });

  }

  render() {
    if (!this.state.vendor) return null;

    return (
      <div className="row row-cols-1 row-cols-md-1 g-4 p-2">
        <div className="col" key={this.state.vendor._id}>
          <div className="card h-100 ml-1">
            <img className="card-img-top" src={this.state.vendor.profileImg} alt={this.state.vendor.firstName} />
            <div className="card-body">
              <h5 className="card-title">{this.state.vendor.firstName}</h5>
              <p className="card-text">{this.state.vendor.description}</p>
            </div>
          </div>
        </div>
        <h2>Services offered by {this.state.vendor.firstName}:</h2>
        {this.state.vendorServices.map(service =>   
          <div className="col" key={service._id}>      
          <div className="card h-100 ml-1">
            <img className="card-img-top" src={service.images[0]} alt={service.name} />
            <div className="card-body">
              <h5 className="card-title">{service.name}</h5>
              <p className="card-text">{service.cityName}</p>
              <Link to={`/service/${service._id}`} className="btn btn-primary" type="button">Learn more</Link>
            </div>
          </div>
        </div>
          )}
        
      </div>
    );
  }
}

