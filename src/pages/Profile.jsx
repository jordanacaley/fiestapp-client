import React, { Component } from 'react';
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { withUser } from "../components/Auth/withUser";

class Profile extends Component {

  state = {
    user: [],
    userServices: [],
    allServices: [],
}

componentDidMount() {
  const promises = Promise.all([
    apiHandler.getUserInfo(),
    apiHandler.getUserServices(),
    apiHandler.getServices(),
  ]);

  promises.then((allPromises) => {
    const userInfo = allPromises[0];
    const userServices = allPromises[1];
    const allServices = allPromises[2];

    this.setState({
      user: userInfo,
      userServices: userServices,
      allServices: allServices,
    });
  });
}

handleDelete = (serviceId) => {
  console.log(serviceId)
  axios
    .delete("http://localhost:6001/api/services/" + serviceId)
    .then((response) => {
      this.setState({
        allServices: this.state.allServices.filter((service) => {
          return service._id !== serviceId;
        }),
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

render() {
    return (
      <div>
        <h1>Welcome, {this.state.user.firstName}!</h1>
        <h2>Your profile:</h2>
        <div className="row row-cols-1 row-cols-md-6 g-4 p-2">
            <div className="col">      
              <div className="card h-100 ml-1">
                <img className="card-img-top" src={this.state.user.profileImg} alt={this.state.user.firstName} />
                <div className="card-body">
                  <h5 className="card-title">{this.state.user.firstName} {this.state.user.lastName}</h5>
                  <p className="card-text">Email: {this.state.user.email}</p>
                  <p className="card-text">Phone: {this.state.user.phoneNumber}</p>
                  <p className="card-text">Description: {this.state.user.description}</p>
                  <button type="button" className="btn btn-warning mx-3">Edit Profile</button>
                </div>
              </div>
            </div>
        </div>
        <h2>Your services:</h2>
        {!this.state.userServices.length && (
          <React.Fragment>
            <div>
              <img src="decor.svg" style={{height: "100px"}} alt="" />
            </div>
            <p>You're not offering any services yet.</p>
          </React.Fragment>
        )}
        <div className="row row-cols-1 row-cols-md-6 g-4 p-2">
            {this.state.userServices.map(service =>   
            <div className="col" key={service._id}>      
              <div className="card h-100 ml-1">
                <img className="card-img-top" src={service.images[0]} alt={service.name} />
                <div className="card-body">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">{service.cityName}</p>
                  <button type="button" className="btn btn-warning mx-3">Edit</button>
                  <button type="button" className="btn btn-danger" onClick={() => this.handleDelete(service._id)}>Delete</button>
                </div>
              </div>
            </div>
            )}
        </div>
        <button type="button" className="btn btn-primary mx-3">Add a service</button>
      </div>
    );
  }
}

export default withUser(Profile);