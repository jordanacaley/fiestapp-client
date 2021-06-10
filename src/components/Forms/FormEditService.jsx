import React, { Component } from "react";
import AutoComplete from "./../Autocomplete";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
// import FeedBack from "./../Feedback";
// import "../../styles/ItemForm.css";


class ServiceEditForm extends Component {
  state = {
    service: null,
    name: "",
    description: "",
    category: "",
    durationHrs: 0,
    price: 0,
    cityName: "",
    location: {
      coordinates: [],
    },
    images: "",
    // httpResponse: null,
  }

  componentDidMount() {
    apiHandler
      .getOneService(this.props.match.params.id)
      .then((data) => {
        this.setState({ service: data, name: data.name, description: data.description, category: data.category, durationHrs: data.durationHrs, price: data.price, cityName: data.cityName, location: data.location, images: data.images });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  imageRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.type === "file" ? event.target.files : event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const { httpResponse, ...service } = this.state;
    buildFormData(fd, service); // You can find this function in ./src/utils.js
    // Function implemented by user "Vladi Vlad" @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041


    [...this.imageRef.current.files].forEach((file) => {
      return fd.append("images", file)
    }) 

    apiHandler
      .updateService(this.props.match.params.id, fd)
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

    if(!this.state.service) {
      return (
        <div>Loading...</div>
      )
    } 

    return (

      <div className="m-3">
      <h1 className="w-75 mx-auto mb-0">Edit service</h1>
      <form onSubmit={this.handleSubmit} className="w-75 mx-auto" >

      <div className="form-group">
          <label htmlFor="name" className="form-label mt-4">Name</label>
          <input onChange={this.handleChange} value={this.state.name || ""} type="text" id="name" className="form-control" name="name" placeholder="What service do you offer?"/>
        </div>

        <div class="form-group">
          <label htmlFor="category" class="form-label mt-4">Category</label>
          <select className="form-select" id="category" name="category" onChange={this.handleChange} value={this.state.category || ""}>
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
          <input onChange={this.handleChange} value={this.state.durationHrs || ""} type="number" id="durationHrs" className="form-control" name="durationHrs" />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label mt-4">Price (USD)</label>
          <input onChange={this.handleChange} value={this.state.price || ""} type="number" id="price" className="form-control" name="price" />
        </div>

        <div className="form-group">
          <label htmlFor="cityName" className="form-label mt-4">City Name</label>
          <input onChange={this.handleChange} value={this.state.cityName || ""} type="text" id="cityName" className="form-control" name="cityName" placeholder="Your city name"/>
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label mt-4">Street Address</label>
          <AutoComplete onSelect={this.handlePlace} />
        </div>

        <div className="form-group">
            <label htmlFor="description" className="form-label mt-4">Description</label>
            <input onChange={this.handleChange} value={this.state.description || ""} type="text" id="description" className="form-control" name="description" placeholder="Tell potential customers about your service" />
          </div>

          <div className="form-group">
            <label className="form-label mt-4">Your current images</label>
              <div className="d-flex mb-2">
                {this.state.images.map(image => 
                <div>
                  <p className="mb-0">X</p>
                  <img src={image} alt="" className="mx-1 rounded" style={{height: "100px"}} />
                </div>
                )}
              </div>
          </div>

        <div className="mt-3">
          <label className="mb-1">Upload more images</label>
          <div>
            <input ref={this.imageRef} type="file" name="images" multiple />
          </div>
        </div>

          <button type="submit" className="btn btn-primary mt-3">Update service</button>
      </form>
    </div>          


    );
  }
}

export default withUser(ServiceEditForm);