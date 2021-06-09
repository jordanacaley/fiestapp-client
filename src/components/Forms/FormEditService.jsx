import React, { Component } from "react";
import AutoComplete from "./../Autocomplete";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import FeedBack from "./../Feedback";
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
    images: [],
    // httpResponse: null,
  }

  componentDidMount() {
    apiHandler
      .getOneService(this.props.match.params.id)
      .then((data) => {
        console.log(data)
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
        this.setState({
          httpResponse: {
            status: "success",
            message: "Service successfully added.",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message: "An error occured, try again later.",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      });

      this.props.history.push('/profile')
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
      <div className="ItemForm-container">
        <form 
          className="ItemForm" 
          onSubmit={this.handleSubmit}
        >
          <h2>Edit Service</h2>
          {/* {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )} */}
          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              className="input"
              type="text"
              placeholder="What service do you offer?"
              name="name"
              onChange={this.handleChange}
              value={this.state.name || ""}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              id="category"
              onChange={this.handleChange}
              value={this.state.category || ""}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Venue">Venue</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Music">Music</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Decorations & Favors">Decorations & Favors</option>
              <option value="Furniture">Furniture</option>
              <option value="Costumes">Costumes</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="durationHrs">
              Duration (hours)
            </label>
            <input
              value={this.state.durationHrs || ""}
              onChange={this.handleChange}
              className="input"
              type="number"
              name="durationHrs"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="price">
              Price $
            </label>
            <input
              value={this.state.price || ""}
              onChange={this.handleChange}
              className="input"
              type="number"
              name="price"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="cityName">
              City Name
            </label>
            <input
              className="input"
              type="text"
              placeholder="Your city"
              name="cityName"
              onChange={this.handleChange}
              value={this.state.cityName || ""}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="location">
              Street Address
            </label>
            <AutoComplete onSelect={this.handlePlace} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              value={this.state.description || ""}
              onChange={this.handleChange}
              name="description"
              id="description"
              className="text-area"
              placeholder="Please provide details about your service"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Upload images</label>
            <input ref={this.imageRef} type="file" name="images" multiple  />
          </div>

          <button>Edit Service</button>
        </form>
      </div>
    );
  }
}

export default withUser(ServiceEditForm);