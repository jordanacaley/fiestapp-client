import React from "react";
import "./../styles/ItemDisplay.css";
import { Link } from "react-router-dom"

const ServiceDisplay = ({ service, handleClose }) => {
  return (

    <div className="Item-container text-white bg-info mb-3">
      <p onClick={handleClose} className="close-link mb-0 btn btn-warning btn-sm col-2" type="button">
        Close
      </p>
      <div className="round-image">
        <img className="user-img" src={service.images[0]} alt="service" />
      </div>
      <h4 className="card-title mx-auto">{service.name}</h4>
      <p className="card-text mx-auto">Category: {service.category}</p>
      <p className="card-text mx-auto">{service.cityName}</p>
      <Link to={`service/${service._id}`} className="btn btn-primary" type="button">Learn more</Link>
    </div>
  );
};

export default ServiceDisplay;
