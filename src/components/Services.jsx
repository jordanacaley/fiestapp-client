import React, { Component } from 'react';
import axios from "axios";

export default class Services extends Component {

  state = {
    services: []
}

componentDidMount() {
    axios.get("http://localhost:6001/api/services")
    .then(response => {
        this.setState({services: response.data})
    })
}

render() {
    return (
        <div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {this.state.services.map(service =>   
            <div className="col">      
              <div key={service._id} className="card h-100">
                <img className="card-img-top" src={service.images[0]} alt={service.name} />
                <div className="card-body">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">City? TBD</p>
                </div>
              </div>
            </div>

            )}
        </div>
        </div>
    );
  }
}
