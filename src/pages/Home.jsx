import React from "react";
import { Link } from "react-router-dom";
import Services from "../components/Services"

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-light hero-image d-flex flex-column justify-content-center p-4">
          <h1 className="display-3 text-light font-weight-bold">FiestApp</h1>
          <p className="lead font-weight-bold ">The party starts here 💃</p>
          <p className="lead">
            <Link to ="/all-services" className="btn btn-primary btn-lg font-weight-bold" type="button">Browse services</Link>
          </p>
        </div>
        <Services />
      </div>
    );
  }
}

export default Home;
