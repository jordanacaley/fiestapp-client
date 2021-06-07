import React from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class AppMap extends React.PureComponent {
  state = {
    lng: -92.92511, // Default lng and lat set to the center of Villahermosa.
    lat: 17.976122,
    zoom: 8, // used for map zoom level
  };

  handleClick = (selectedService) => {
    // Pass the selectedService back to the parent.
    this.props.handleSelectService(selectedService);
  };

  render() {
    const venues = this.props.services.filter(
      (service) => service.category === "Venue"
    );

    const foods = this.props.services.filter(
      (service) => service.category === "Food & Beverages"
    );
  
    const venueMarker = venues.map((service, index) =>  <Marker
          key={index}
          coordinates={[service.location.coordinates[0], service.location.coordinates[1]]}
          onClick={(event) => this.handleClick(service)} >
          <img src="/venue.svg" alt=""  style={{width: "32px", height: "32px"}} />          
      </Marker>);

    const foodMarker = foods.map((service, index) =>  <Marker
    key={index}
    coordinates={[service.location.coordinates[0], service.location.coordinates[1]]}
    onClick={(event) => this.handleClick(service)} >
    <img src="/food.svg" alt=""  style={{width: "32px", height: "32px"}} />          
    </Marker>);

    return (
      <Map
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/light-v10"
        zoom={[8]}
        containerStyle={{
          height: "500px",
        }}
        center={[this.state.lng, this.state.lat]}
      >
        {venueMarker}
      
      </Map>
    );
  }
}

export default AppMap;
