import React, { useState } from "react";
// eslint-disable-next-line import/extensions
import Carousel from "../components/carousel/Carousel.jsx";
// eslint-disable-next-line import/extensions
import Map from "../components/Map/Map.jsx";
import "../assets/styles/index.scss";
import "./Home.scss";
import FilterButton from "../components/FilterButton/FilterButton";
import ArrayDataCities from "../components/arrayDataCities/ArrayDataCities";

function Home() {
  const [propertyType, setPropertyType] = useState([21, 111, 121]);
  return (
    <div className="homeContent">
      <Carousel />
      <ArrayDataCities />
      <Map propertyType={propertyType} />
      <div className="filterButtonsPosition">
        <FilterButton
          text="Appartement"
          codeBien={121}
          selected
          propertyType={propertyType}
          setPropertyType={setPropertyType}
        />
        <FilterButton
          text="Maison"
          codeBien={111}
          selected
          propertyType={propertyType}
          setPropertyType={setPropertyType}
        />
        <FilterButton
          text="Terrain à construire"
          codeBien={21}
          selected
          propertyType={propertyType}
          setPropertyType={setPropertyType}
        />
      </div>
    </div>
  );
}

export default Home;
