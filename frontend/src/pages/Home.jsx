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
  const [countSearchbar, setCountSearchbar] = useState(0);
  const [communeSelectedAdd, setCommuneSelectedAdd] = useState([]);
  const [cityDataAdd, setCityDataAdd] = useState([]);
  const [cityDataSearch, setCityDataSearch] = useState([]);

  const handleRemoveCodeInseeAdd = (index) => {
    const newCommuneSelectedAdd = [...communeSelectedAdd];
    const newCityDataAdd = [...cityDataAdd];
    newCommuneSelectedAdd.splice(index, 1);
    newCityDataAdd.splice(index, 1);
    setCommuneSelectedAdd(newCommuneSelectedAdd);
    setCityDataAdd(newCityDataAdd);
    setCountSearchbar(countSearchbar - 1);
    setCityDataSearch([]);
  };

  return (
    <div className="homeContent">
      <Carousel />
      <ShortIntroduction />
      <div className="SearchBar">
        <Searchbar
          setCountSearchbar={setCountSearchbar}
          countSearchbar={countSearchbar}
          setCommuneSelectedAdd={setCommuneSelectedAdd}
          setCityDataAdd={setCityDataAdd}
          communeSelectedAdd={communeSelectedAdd}
          setCityDataSearch={setCityDataSearch}
          cityDataAdd={cityDataAdd}
        />

        {cityDataAdd.length > 0 && (
          <div>
            Communes sélectionnées :
            <ul>
              {communeSelectedAdd.map((name, index) => (
                <li key={name}>
                  {name}
                  <button
                    type="button"
                    onClick={() => handleRemoveCodeInseeAdd(index)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ArrayDataCities />
      <ArrayCitiesInput
        cityDataSearch={cityDataSearch}
        cityDataAdd={cityDataAdd}
      />
      <Map propertyType={propertyType} cityDataSearch={cityDataSearch} />
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
