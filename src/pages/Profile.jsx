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
        <h1>Welcome!</h1>
      </div>
    );
  }
}
