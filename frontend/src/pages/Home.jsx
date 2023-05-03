import React, { useState } from "react";
// eslint-disable-next-line import/extensions
import Carousel from "../components/carousel/Carousel";
// eslint-disable-next-line import/extensions
import Map from "../components/Map/Map";
import "../assets/styles/index.scss";
import "./Home.scss";
import FilterButton from "../components/FilterButton/FilterButton";
import Searchbar from "../components/Searchbar/Searchbar";
import ArrayDataCities from "../components/arrayDataCities/ArrayDataCities";
import ShortIntroduction from "../components/shortIntroduction/ShortIntroduction";

function Home() {
  const [propertyType, setPropertyType] = useState([21, 111, 121]);
  const [codeInsee, setCodeInsee] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  return (
    <div className="homeContent">
      <Carousel />
      <ShortIntroduction />
      <div className="SearchBar">
        <Searchbar
          setCodeInsee={setCodeInsee}
          setCoordinates={setCoordinates}
        />
      </div>
      <ArrayDataCities codeInsee={codeInsee} />
      <Map
        propertyType={propertyType}
        codeInsee={codeInsee}
        coordinates={coordinates}
      />
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
