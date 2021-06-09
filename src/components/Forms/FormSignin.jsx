import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";

class FormSignin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (

      <div className="m-3">
        <h1 className="w-75 mx-auto">Welcome back to the party!</h1>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit} className="w-75 mx-auto" >
          <div className="form-group">
            <label htmlFor="email" className="form-label mt-4">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label mt-4">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" />
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </div>
        </form>
      </div>

    );
  }
}

export default withRouter(withUser(FormSignin));
