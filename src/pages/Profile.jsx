import React, { Component } from 'react';
import apiHandler from "../api/apiHandler"

// const Profile = (props) => {
//   return (
//     <div>
//       <h1>Welcome, {props.firstName}</h1>
//     </div>
//   );
// };

// export default Profile;

export default class Profile extends Component {

  state = {
    user: [],
    userServices: [],
}

componentDidMount() {
  const promises = Promise.all([
    apiHandler.getUserInfo(),
    apiHandler.getUserServices(),
  ]);

  promises.then((allPromises) => {
    const userInfo = allPromises[0];
    const userServices = allPromises[1];

    this.setState({
      user: userInfo,
      userServices: userServices,
    });
  });
}

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
                  <button type="button" className="btn btn-warning mx-3">Edit</button>
                </div>
              </div>
            </div>
        </div>
        <h2>Your services:</h2>
        <div className="row row-cols-1 row-cols-md-6 g-4 p-2">
            {this.state.userServices.map(service =>   
            <div className="col" key={service._id}>      
              <div className="card h-100 ml-1">
                <img className="card-img-top" src={service.images[0]} alt={service.name} />
                <div className="card-body">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">{service.cityName}</p>
                  <button type="button" className="btn btn-warning mx-3">Edit</button>
                  <button type="button" className="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
            )}
        </div>
        <button type="button" class="btn btn-primary mx-3">Add a service</button>
      </div>
    );
  }
}
