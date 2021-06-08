import React, { Component } from "react";
import AutoComplete from "./../Autocomplete";
import UploadWidget from "../UploadWidget";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import FeedBack from "./../Feedback";
// import "../../styles/ItemForm.css";

const initialState = {
  name: "",
  description: "",
  category: "",
  durationHrs: 0,
  price: 0,
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
      this.setState({ error: "No category selected !" }, () => {
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
        this.props.addService(data);
        // this.setState({
        //   name: "",
        //   category: "",
        //   quantity: "",
        //   location: {
        //     coordinates: [],
        //   },
        //   address: "",
        //   description: "",
        //   httpResponse: {
        //     status: "success",
        //     message: "Item successfully added.",
        //   },
        // });

        this.setState({
          ...initialState,
          httpResponse: {
            status: "success",
            message: "Item successfully added.",
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

  handlePlace = (place) => {
    this.setState({ location: place.geometry });
  };

  render() {
    const { httpResponse, error } = this.state;

    return (
      <div className="ItemForm-container">
        <form className="ItemForm" onSubmit={this.handleSubmit}>
          <h2>Add Service</h2>
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
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="What service do you offer?"
              name="name"
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
              value={this.state.category}
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
              value={this.state.durationHrs}
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
              value={this.state.price}
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
              value={this.state.description}
              onChange={this.handleChange}
              name="description"
              id="description"
              className="text-area"
              placeholder="Please provide details about your service"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Upload images</label>
            <input ref={this.imageRef} type="file" name="images" multiple />
        
          </div>

          {error && <FeedBack message={error} status="failure" />}
          <button>Add Service</button>
        </form>
      </div>
    );
  }
}

export default withUser(ServiceForm);