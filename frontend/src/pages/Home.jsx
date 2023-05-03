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

function Home() {
  const [propertyType, setPropertyType] = useState([21, 111, 121]);
  const [codeInsee, setCodeInsee] = useState([]);
  const [coordonnées, setCoordonnées] = useState([]);

  const handleAddCodeInsee = (code) => {
    setCodeInsee((prevCodeInsee) => [...prevCodeInsee, code]); // Ajoute le code au tableau
  };

  const handleAddCoordonnées = (code) => {
    setCoordonnées((prevCoordonnées) => [...prevCoordonnées, code]); // Ajoute les coordonnées au tableau
  };

  const handleReset = () => {
    setCodeInsee([]);
    setCoordonnées([]);
  };

  return (
    <div className="homeContent">
      <Carousel />
      <div className="SearchBar">
        <Searchbar
          addCodeInsee={handleAddCodeInsee}
          reset={handleReset}
          addCoordonnées={handleAddCoordonnées}
        />
        {/* si condition codeInsee.length est vrai le and sera lu autrement non */}
        {codeInsee.length > 0 && (
          <div>
            Codes INSEE :<ul>{codeInsee}</ul>
            <ul>{coordonnées}</ul>
          </div>
        )}
      </div>
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
