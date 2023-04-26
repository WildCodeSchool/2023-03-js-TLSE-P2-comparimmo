import React, { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import Carousel from "@components/Carousel/Carousel";
import FilterButton from "../components/FilterButton/FilterButton";
import "./Home.scss";

function Home() {
  const [propertyType, setPropertyType] = useState([21, 111, 121]);
  return (
    <div>
      <section>
        <Carousel />
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
