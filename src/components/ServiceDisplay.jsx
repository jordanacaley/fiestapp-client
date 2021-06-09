import React from "react";
import "./../styles/ItemDisplay.css";
import { Link } from "react-router-dom"

const ServiceDisplay = ({ service, handleClose }) => {
  return (
    <div className="Item-container">
      <p onClick={handleClose} className="close-link" style={{color: "black"}}>
        X
      </p>
      <div className="round-image">
        <img className="user-img" src={service.images[0]} alt="service" />
      </div>
      <h2 className="title">{service.name}</h2>
      <Link to={`service/${service._id}`} className="btn btn-primary" type="button">{service.name}</Link>
      <div className="info">
        <span>{service.category}</span>
      </div>
      <p className="description">{service.description}</p>
      <p className="location">{service.cityName}</p>
      <div className="user-info">
        <div className="round-image-user">
          <img src={service.vendorId.profileImg} alt="user" />
        </div>
        <span>Provided by <Link to={`vendor/${service.vendorId._id}`} className="btn btn-primary" type="button">{service.vendorId.firstName}</Link></span>
      </div>
    </div>
  );
};

export default ServiceDisplay;
