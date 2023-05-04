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
  const [codeInseeAdd, setCodeInseeAdd] = useState([]);
  const [countSearchbar, setCountSearchbar] = useState(0);
  const [communeSelectedAdd, setCommuneSelectedAdd] = useState("");
  const [cityDataAdd, setCityDataAdd] = useState("");
  const [codeInseeSearch, setCodeInseeSearch] = useState([]);
  const [cityDataSearch, setCityDataSearch] = useState("");
  const [inseeZoomCity, setInseeZoomCity] = useState("");

  const handleRemoveCodeInseeAdd = (index) => {
    const newCodeInseeAdd = [...codeInseeAdd];
    const newCommuneSelectedAdd = [...communeSelectedAdd];
    const newCityDataAdd = [...cityDataAdd];
    const newCodeInseeSearch = [...codeInseeSearch];
    const newCityDataSearch = [...cityDataSearch];
    newCodeInseeAdd.splice(index, 1);
    newCommuneSelectedAdd.splice(index, 1);
    newCityDataAdd.splice(index, 1);
    newCodeInseeSearch.splice(index, 1);
    newCityDataSearch.splice(index, 1);
    setCodeInseeAdd(newCodeInseeAdd);
    setCommuneSelectedAdd(newCommuneSelectedAdd);
    setCityDataAdd(newCityDataAdd);
    setCountSearchbar(countSearchbar - 1);
    setCodeInseeSearch(newCodeInseeSearch);
    setCityDataSearch(newCityDataSearch);
  };

  return (
    <div className="homeContent">
      <Carousel />
      <ShortIntroduction />
      <div className="SearchBar">
        <Searchbar
          setCodeInseeAdd={setCodeInseeAdd}
          setCountSearchbar={setCountSearchbar}
          countSearchbar={countSearchbar}
          setCommuneSelectedAdd={setCommuneSelectedAdd}
          setCityDataAdd={setCityDataAdd}
          setCodeInseeSearch={setCodeInseeSearch}
          codeInseeAdd={codeInseeAdd}
          communeSelectedAdd={communeSelectedAdd}
          setCityDataSearch={setCityDataSearch}
          cityDataAdd={cityDataAdd}
        />

        {codeInseeAdd.length > 0 && (
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
        inseeZoomCity={inseeZoomCity}
        setInseeZoomCity={setInseeZoomCity}
      />
      <Map
        propertyType={propertyType}
        cityDataSearch={cityDataSearch}
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
