import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    description: "",
    profileImg: "",
  };

  imageRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          onChange={this.handleChange}
          value={this.state.firstName}
          type="text"
          id="firstName"
          name="firstName"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          onChange={this.handleChange}
          value={this.state.lastName}
          type="text"
          id="lastName"
          name="lastName"
        />
        <label htmlFor="description">Description</label>
        <input
          onChange={this.handleChange}
          value={this.state.description}
          type="textarea"
          id="description"
          name="description"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={this.handleChange}
          value={this.state.email}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          onChange={this.handleChange}
          value={this.state.phoneNumber}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
        />
        <label>Upload image</label>
        <input ref={this.imageRef} type="file" name="profileImg" />
        <button>Submit</button>
      </form>
    );
  }
}

export default withRouter(withUser(FormSignup));
