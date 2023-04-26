import React from "react";
// eslint-disable-next-line import/no-unresolved
import Carousel from "@components/Carousel/Carousel";
// eslint-disable-next-line import/no-unresolved
import Map from "@components/Map/Map";
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
