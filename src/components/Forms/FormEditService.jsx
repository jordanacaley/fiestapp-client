import React, { Component } from "react";
import AutoComplete from "./../Autocomplete";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import FeedBack from "./../Feedback";
// import "../../styles/ItemForm.css";


class ServiceEditForm extends Component {
  state = {
    httpResponse: null,
  }

  formRef = React.createRef();

  imageRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.type === "file" ? event.target.files : event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data); // You can find this function in ./src/utils.js
    // Function implemented by user "Vladi Vlad" @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041

    //fd.append("images", this.imageRef.current.files);
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
  };

  handleFileSelect = ({ tmpUrl, files }) => {
    this.setState({ images: files });
  };

  handlePlace = (place) => {
    this.setState({ location: place.geometry });
  };

  render() {
    const { httpResponse } = this.state;

    const { name, category, description, location, durationHrs, price } = this.props.match.params.id;

    return (
      <div className="ItemForm-container">
        <form 
          ref={this.formRef}
          className="ItemForm" 
          onSubmit={this.handleSubmit}
        >
          <h2>Edit Service</h2>
          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}
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
              value={name || ""}
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
              value={category || ""}
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
              value={durationHrs || ""}
              onChange={this.handleChange}
              className="input"
              type="number"
              name="durationHrs"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="price">
              Price
            </label>
            <input
              value={price || ""}
              onChange={this.handleChange}
              className="input"
              type="number"
              name="price"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <AutoComplete onSelect={this.handlePlace} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              value={description || ""}
              onChange={this.handleChange}
              name="description"
              id="description"
              className="text-area"
              placeholder="Please provide details about your service"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Upload images</label>
            <input ref={this.imageRef} onFileSelect={this.handleFileSelect} type="file" name="images" multiple />
        
          </div>

          <button>Edit Service</button>
        </form>
      </div>
    );
  }
}

export default withUser(ServiceEditForm);