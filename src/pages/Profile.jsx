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
      <div className="m-3">

        <h1 className="text-center">Welcome, {this.state.user.firstName}!</h1>

        <div className="card border-success mb-3 mx-auto mt-3 text-center" style={{maxWidth: "60rem"}}>
          <div className="card-header">Your Profile</div>
          <div className="card-body">
            <h4 className="card-title">{this.state.user.firstName} {this.state.user.lastName}</h4>
            <img className="mx-auto mb-2" src={this.state.user.profileImg} alt={this.state.user.firstName} style={{height: "150px", borderRadius: "20px"}} />
            <p className="card-text">Email: {this.state.user.email}</p>
            <p className="card-text">Phone: {this.state.user.phoneNumber}</p>
            <p className="card-text">Description: {this.state.user.description}</p>
            <button type="button" className="btn btn-success mx-3">Edit</button>
          </div>
        </div>


        <h2 className="text-center">Your services:</h2>
          <React.Fragment>
            {!this.state.user.servicesOffered.length && (

                <div className="card border-info mb-3 mx-auto mt-3 text-center" style={{maxWidth: "60rem"}}>
                  <div className="card-header">You are not currently offering any services</div>
                  <div className="card-body">
                    <img className="mx-auto mb-2" src="decor.svg" alt="Party hat" style={{height: "100px", borderRadius: "20px"}} />
                  </div>
                </div>

            )}
                {this.state.user.servicesOffered.map(service =>   
                <div key={service._id} className="card border-info mb-3 mx-auto mt-3 text-center" style={{maxWidth: "60rem"}}>
                  <div className="card-header">{service.name}</div>
                  <div className="card-body">
                    <img className="mx-auto mb-2" src={service.images[0]} alt={service.name} style={{height: "200px", borderRadius: "20px"}} />
                    <p className="card-text">City: {service.cityName}</p>
                    <p className="card-text">Description: {service.description}</p>
                    <Link to={`/service/edit/${service._id}`} className="btn btn-info mx-3" type="button">Edit</Link>
                    <button type="button" className="btn btn-danger" onClick={() => this.handleDelete(service._id)}>Delete</button>
                  </div>
                </div>

                )}
          </React.Fragment> 

          <div className="text-center">
            <Link to={"/service/create"} className="btn btn-primary btn-lg" type="button">Add a service</Link>
          </div>
      </div>
    );
  }
}

export default withUser(Profile);