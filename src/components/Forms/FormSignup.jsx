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

      <div className="m-3">
        <h1 className="w-75 mx-auto mb-0">Come join the party!</h1>
        <form onSubmit={this.handleSubmit} className="w-75 mx-auto" >

        <div className="form-group">
            <label htmlFor="firstName" className="form-label mt-4">First Name</label>
            <input onChange={this.handleChange} value={this.state.firstName} type="text" id="firstName" className="form-control" name="firstName" placeholder="Enter first name"/>
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label mt-4">Last Name</label>
            <input onChange={this.handleChange} value={this.state.lastName} type="text" id="lastName" className="form-control" name="lastName" placeholder="Enter last name" />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label mt-4">Email address</label>
            <input onChange={this.handleChange} value={this.state.email} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label mt-4">Password</label>
            <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label mt-4">Description</label>
            <input onChange={this.handleChange} value={this.state.description} type="text" id="description" className="form-control" name="description" placeholder="A little about you" />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label mt-4">Phone number</label>
            <input onChange={this.handleChange} value={this.state.phoneNumber} type="text" id="phoneNumber" className="form-control" name="phoneNumber" placeholder="Enter phone number" />
          </div>

          <div className="mt-3">
            <label className="mb-1">Profile photo</label>
            <div>
              <input ref={this.imageRef} type="file" name="profileImg" />
            </div>
          </div>

            <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>

    );
  }
}

export default withRouter(withUser(FormSignup));
