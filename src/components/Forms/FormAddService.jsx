import React, { Component } from "react";
import AutoComplete from "./../Autocomplete";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";

const initialState = {
  name: "",
  description: "",
  category: "",
  durationHrs: 0,
  price: 0,
  cityName: "",
  location: {
    coordinates: [],
  },
  httpResponse: null,
  error: null,
};


class ServiceForm extends Component {
  state = initialState;

  imageRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)

    // Handle some validation here.

    // eg:
    if (!this.state.category) {
      this.setState({ error: "Please select a category" }, () => {
        this.timeoutId = setTimeout(() => {
          this.setState({ error: null });
        }, 1000);
      });
      return;
    }
    

    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data); // You can find this function in ./src/utils.js
    // Function implemented by user "Vladi Vlad" @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041

    //fd.append("images", this.imageRef.current.files);

    [...this.imageRef.current.files].forEach((file) => {
      return fd.append("images", file)
    }) 

    apiHandler
      .addService(fd)
      .then((data) => {
        // this.props.onServiceUpdate(data);
        this.props.history.push('/profile') 
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          httpResponse: {
            status: "failure",
            message: "An error occured, try again later.",
          },
        });        
      });

  };

  handlePlace = (place) => {
    this.setState({ location: place.geometry });
  };

  render() {
    // const { httpResponse, error } = this.state;

    return (
      <div className="m-3">
      <h1 className="w-75 mx-auto mb-0">Add a service</h1>
      <form onSubmit={this.handleSubmit} className="w-75 mx-auto" >

      <div className="form-group">
          <label htmlFor="name" className="form-label mt-4">Name</label>
          <input onChange={this.handleChange} value={this.state.name} type="text" id="name" className="form-control" name="name" placeholder="What service do you offer?"/>
        </div>

        <div class="form-group">
          <label htmlFor="category" class="form-label mt-4">Category</label>
          <select className="form-select" id="category" name="category" onChange={this.handleChange} value={this.state.category}>
            <option value="" disabled>Select a category</option>
            <option value="Venue">Venue</option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="Music">Music</option>
            <option value="Decorations & Favors">Decorations & Favors</option>
            <option value="Furniture">Furniture</option>
            <option value="Costumes">Costumes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="durationHrs" className="form-label mt-4">Duration (hours)</label>
          <input onChange={this.handleChange} value={this.state.durationHrs} type="number" id="durationHrs" className="form-control" name="durationHrs" />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label mt-4">Price (USD)</label>
          <input onChange={this.handleChange} value={this.state.price} type="number" id="price" className="form-control" name="price" />
        </div>

        <div className="form-group">
          <label htmlFor="cityName" className="form-label mt-4">City Name</label>
          <input onChange={this.handleChange} value={this.state.cityName} type="text" id="cityName" className="form-control" name="cityName" placeholder="Your city name"/>
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label mt-4">Street Address</label>
          <AutoComplete onSelect={this.handlePlace} />
        </div>

        <div className="form-group">
            <label htmlFor="description" className="form-label mt-4">Description</label>
            <input onChange={this.handleChange} value={this.state.description} type="text" id="description" className="form-control" name="description" placeholder="Tell potential customers about your service" />
          </div>

        <div className="mt-3">
          <label className="mb-1">Upload 1-5 images</label>
          <div>
            <input ref={this.imageRef} type="file" name="images" multiple />
          </div>
        </div>

          <button type="submit" className="btn btn-primary mt-3">Add service</button>
      </form>
    </div>    

    );
  }
}

export default withUser(ServiceForm);