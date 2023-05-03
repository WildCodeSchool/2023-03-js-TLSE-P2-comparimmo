import React, { useState } from "react";
// eslint-disable-next-line import/extensions, import/no-unresolved
import Carousel from "../components/carousel/Carousel";
// eslint-disable-next-line import/extensions, import/no-unresolved
import Map from "../components/Map/Map";
import "../assets/styles/index.scss";
import "./Home.scss";
// eslint-disable-next-line import/no-unresolved
import FilterButton from "../components/FilterButton/FilterButton";
// eslint-disable-next-line import/no-unresolved
import Searchbar from "../components/Searchbar/Searchbar";
// eslint-disable-next-line import/no-unresolved
import ArrayDataCities from "../components/arrayDataCities/ArrayDataCities";
import ArrayCitiesInput from "../components/arrayCitiesInput/ArrayCitiesInput";
// eslint-disable-next-line import/no-unresolved
import ShortIntroduction from "../components/shortIntroduction/ShortIntroduction";

function Home() {
  const [propertyType, setPropertyType] = useState([21, 111, 121]);
  const [cityData, setCityData] = useState([]);
  const [inseeZoomCity, setInseeZoomCity] = useState("");

  return (
    <div className="homeContent">
      <Carousel />
      <ShortIntroduction />
      <div className="SearchBar">
        <Searchbar setCityData={setCityData} />
      </div>
      <ArrayDataCities />
      <ArrayCitiesInput
        cityData={cityData}
        inseeZoomCity={inseeZoomCity}
        setInseeZoomCity={setInseeZoomCity}
      />
      <Map
        propertyType={propertyType}
        cityData={cityData}
        inseeZoomCity={inseeZoomCity}
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
