import React, { Component } from 'react';
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import { Link } from "react-router-dom"

class Profile extends Component {

  state = {
    user: null,
  }

componentDidMount() {
  apiHandler.getUserInfo().then((data) => {
    console.log(data)
    this.setState({ user: data });
  });
}

handleDelete = (serviceId) => {
  console.log(serviceId)
  apiHandler.deleteService(serviceId)
    .then((response) => {
      console.log(response);
      this.setState({ user: {
        ...this.state.user,
        servicesOffered :  this.state.user.servicesOffered.filter((service) => {
          return service._id !== serviceId
        })
      } });
    })
    .catch((error) => {
      console.log(error);
    });
};

render() {
  if (!this.state.user) return null;
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
          <React.Fragment>
            {!this.state.user.servicesOffered.length && (
              <React.Fragment>
                <div>
                  <img src="decor.svg" style={{height: "100px"}} alt="" />
                </div>
                <p>You're not offering any services yet.</p>
              </React.Fragment>
            )}
            <div className="row row-cols-1 row-cols-md-6 g-4 p-2">
                {this.state.user.servicesOffered.map(service =>   
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
          </React.Fragment> 
        <Link to={"/service/create"} className="btn btn-primary" type="button">Add a service</Link>
      </div>
    );
  }
}

export default withUser(Profile);