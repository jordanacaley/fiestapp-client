import React from "react";
import "./../styles/ItemDisplay.css";
import { Link } from "react-router-dom"

const ServiceDisplay = ({ service, handleClose }) => {
  return (

    // <div class="card text-white bg-info mb-3" style="max-width: 20rem;">
    //   <div class="card-header">
    //     <p onClick={handleClose} className="close-link" style={{color: "black"}}>X</p>
    //   </div>
    //   <div class="card-body">
    //     <h4 class="card-title">{service.name}</h4>
    //     <img src={service.images[0]} alt={service.name} style={{height: "50px"}} />
    //     <p class="card-text">{service.category}</p>
    //     <p class="card-text">{service.cityName}</p>
    //     <Link to={`service/${service._id}`} className="btn btn-primary" type="button">Learn more</Link>
    //   </div>
    // </div>


    <div className="Item-container text-white bg-info mb-3">
      <p onClick={handleClose} className="close-link mb-0" style={{color: "black"}}>
        X
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
