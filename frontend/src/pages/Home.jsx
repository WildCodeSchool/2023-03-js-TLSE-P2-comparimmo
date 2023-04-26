import React, { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import Carousel from "@components/Carousel/Carousel";
// eslint-disable-next-line import/no-unresolved
import Map from "@components/Map/Map";
import "../assets/styles/index.scss";
import "./Home.scss";
import FilterButton from "../components/FilterButton/FilterButton";

function Home() {
  const [propertyType, setPropertyType] = useState([21, 111, 121]);
  return (
    <div className="homeContent">
      <section>
        <Carousel />
        <Map />
      </section>
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
