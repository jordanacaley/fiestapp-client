import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import NavCategories from "./components/NavCategories";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Venues from "./pages/Venues";
import FoodAndBeverages from "./pages/FoodAndBeverages";
import Music from "./pages/Music";
import Entertainment from "./pages/Entertainment";
import DecorationsAndFavors from "./pages/DecorationsAndFavors";
import Furniture from "./pages/Furniture";
import Costumes from "./pages/Costumes";
import Services from "./components/Services";
import VendorDisplay from "./pages/VendorDisplay";
import OneService from "./pages/OneService";
import FormAddService from "./components/Forms/FormAddService"

function App() {
  return (
    <div className="App">
      <NavMain />
      <NavCategories />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/all-services" component={Services} />
        <Route exact path="/venue" component={Venues} />
        <Route exact path="/food-and-beverages" component={FoodAndBeverages} />
        <Route exact path="/music" component={Music} />
        <Route exact path="/entertainment" component={Entertainment} />
        <Route exact path="/decorations-and-favors" component={DecorationsAndFavors} />
        <Route exact path="/furniture" component={Furniture} />
        <Route exact path="/costumes" component={Costumes} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/vendor/:id" component={VendorDisplay} />
        <Route exact path="/service/create" component={FormAddService}/>
        <Route exact path="/service/:id" component={OneService} />
      </Switch>
    </div>
  );
}

export default App;
