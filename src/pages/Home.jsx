import React from "react";
import { Link } from "react-router-dom";
import MapApp from "../components/MapApp";
import apiHandler from "../api/apiHandler"

class Home extends React.Component {
  state = {
    selectedService: null,
    services: [],
  };

  componentDidMount() {
    apiHandler.getServices().then((data) => {
      this.setState({ services: data });
    });
  }

  onSelectService = (selectedService) => {
    console.log(selectedService)
    this.setState({ selectedService: selectedService });
  };

  render() {
    return (
      <div>
        <div className="jumbotron text-light hero-image d-flex flex-column justify-content-center p-4">
          <h1 className="display-3 text-light font-weight-bold">FiestApp</h1>
          <p className="lead font-weight-bold ">The party starts here 💃</p>
          <p className="lead">
            <Link to ="/all-services" className="btn btn-primary btn-lg font-weight-bold" type="button">Browse all services</Link>
          </p>
        </div>
        <MapApp services={this.state.services} handleSelectService={this.onSelectService} />
      </div>
    );
  }
}

export default Home;
