import React from "react";
// eslint-disable-next-line import/no-unresolved
import Carousel from "../Components/Carousel/Carousel";
// eslint-disable-next-line import/no-unresolved
import Map from "../Components/Map/Map";
import "../assets/styles/index.scss";
import "./Home.scss";

function Home() {
  return (
    <div className="homeContent">
      <Carousel />
      <Map />
    </div>
  );
}

export default Home;
