import React, { useState, useEffect } from "react";
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
// eslint-disable-next-line import/no-unresolved
import ToggleButton from "../components/toggleButton/ToggleButton";

function Home() {
  const [propertyType, setPropertyType] = useState([21, 111, 121]);
  const [countSearchbar, setCountSearchbar] = useState(0);
  const [communeSelectedAdd, setCommuneSelectedAdd] = useState([]);
  const [cityDataAdd, setCityDataAdd] = useState([]);
  const [cityDataSearch, setCityDataSearch] = useState([]);
  const [showCarte, setShowCarte] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Utilisation de useEffect pour détecter si l'écran est inférieur à 769px
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 769) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="reverseSection">
        <section className="sectionIntroSearchArray">
          {cityDataSearch.length === 0 && <ShortIntroduction />}
          <div className="searchBarButtonArrayResults">
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
              <div className="selectedCities">
                Communes sélectionnées :
                <ul className="listCitiesSelected">
                  {communeSelectedAdd.map((name, index) => (
                    <li key={name}>
                      {name}
                      <button
                        className="buttonSelectionned"
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
          {cityDataAdd.length === 0 && (
            <div className="arrayDefault">
              <ArrayDataCities />
            </div>
          )}
          {cityDataSearch.length > 0 && isMobile && (
            <ToggleButton setShowCarte={setShowCarte} showCarte={showCarte} />
          )}

          {cityDataSearch.length > 0 &&
            (showCarte ? (
              <ArrayCitiesInput
                cityDataSearch={cityDataSearch}
                cityDataAdd={cityDataAdd}
              />
            ) : (
              <Map
                propertyType={propertyType}
                cityDataSearch={cityDataSearch}
              />
            ))}
        </section>
        {cityDataAdd.length === 0 && (
          <section className="carouselSection">
            <Carousel />
          </section>
        )}
      </div>
      <section className="sectionMap">
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
        {!isMobile && (
          <Map propertyType={propertyType} cityDataSearch={cityDataSearch} />
        )}
      </section>
    </div>
  );
}

export default Home;
