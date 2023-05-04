import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./searchBar.scss";

function Searchbar({
  setCountSearchbar,
  countSearchbar,
  setCommuneSelectedAdd,
  setCityDataAdd,
  setCityDataSearch,
  cityDataAdd,
}) {
  const [commune, setCommune] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [valueInputOnClick, setValueInputOnClick] = useState("");

  const handleAddCommuneSelectedAdd = (code) => {
    setCommuneSelectedAdd((prevCommuneSelectedAdd) => [
      ...prevCommuneSelectedAdd,
      code,
    ]); // Add commune name to the table
  };

  const handleAddCityDataAdd = (code) => {
    setCityDataAdd((prevCityDataAdd) => [...prevCityDataAdd, code]); // Add commune name to the table
  };

  const handleReset = () => {
    setCommuneSelectedAdd([]);
    setCityDataAdd([]);
    setCityDataSearch([]);
    setSearchInputValue("");
    setValueInputOnClick("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInputValue(e.target.value);
  };

  //   Update query to recove Insee Code
  const onSearchCodePostal = (communeName, codePostal) => {
    axios
      .get(
        `https://geo.api.gouv.fr/communes?nom=${communeName}&codePostal=${codePostal}&fields=code,nom,contour,codesPostaux,population`
      )
      .then((res) => {
        const filteredResults = res.data.filter(
          (result) => result.nom.length === communeName.length
        );
        const codesInsee = filteredResults.map((result) => result.code);
        let insee = [];
        if (codePostal.startsWith(750)) {
          insee.push((parseInt(codePostal, 10) + 100).toString());
        } else if (codePostal.startsWith(130) || codePostal.startsWith(1301)) {
          insee.push((parseInt(codePostal, 10) + 200).toString());
        } else if (codePostal.startsWith(690)) {
          insee.push((parseInt(codePostal, 10) + 380).toString());
        } else if (codePostal.startsWith(75116)) {
          insee.push(parseInt(codePostal, 10).toString());
        } else {
          insee = codesInsee;
        }

        const communeSelected = `${communeName} - ${codePostal}`;
        handleAddCommuneSelectedAdd(communeSelected);

        const cityData = {
          cityName: res.data[0].nom,
          insee,
          housePriceM2: 0,
          aptPriceM2: 0,
          population: res.data[0].population,
          coordinates: res.data[0].contour.coordinates,
        };
        handleAddCityDataAdd(cityData);
      })

      .catch((err) => {
        console.error(err.message);
      });
  };

  //  Update input text
  const onSearchInputValue = (value) => {
    setSearchInputValue(value);
    setValueInputOnClick(value);
  };

  useEffect(() => {
    axios
      .get(`https://geo.api.gouv.fr/communes`)
      .then((res) => {
        setCommune(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  //  Only number
  const regEx = /[0-9]/g;

  return (
    <div>
      <h2 className="titleSearch">VOTRE RECHERCHE</h2>
      {isLoaded ? (
        <div className="search-inner">
          <input
            className="searchBar"
            type="text"
            placeholder="Commune OU code postal"
            onChange={handleSearch}
            value={searchInputValue}
          />
          {countSearchbar >= 5 && (
            <p className="alertMaxCities">Maximum 5 communes</p>
          )}
          <div className="allSearchButton">
            <button
              className="searchButton"
              type="button"
              onClick={() => {
                handleReset("");
                setCountSearchbar(0);
              }}
            >
              Réinitialiser
            </button>
            <button
              className="searchButton"
              type="button"
              onClick={() => {
                const [communeName, codePostal] = searchInputValue.split(" - ");
                onSearchCodePostal(communeName, codePostal);
                setSearchInputValue("");
                setCountSearchbar(countSearchbar + 1);
                setCityDataSearch([]);
              }}
              disabled={
                countSearchbar >= 5 ||
                searchInputValue !== valueInputOnClick ||
                searchInputValue === ""
              }
            >
              Ajouter
            </button>
            <button
              className="searchButton"
              type="button"
              onClick={() => {
                setCityDataSearch(cityDataAdd);
              }}
              disabled={countSearchbar === 0}
            >
              Rechercher
            </button>

            <div />
          </div>
          <div className="dropdown">
            {/* 
                  Allows you to display a pre-searche */}
            {commune
              .filter((item) => {
                const communeName = item.nom.toLowerCase();
                const searchInputValueLower = searchInputValue.toLowerCase();
                const matchName = communeName.startsWith(searchInputValueLower);
                // Search if one of element correspond to code postal
                const matchCodePostal = item.codesPostaux.some((postal) =>
                  postal.startsWith(searchInputValueLower)
                );
                return searchInputValueLower && (matchName || matchCodePostal);
              })
              .map((item) => (
                <div className="dropdown-row" key={item.code}>
                  {regEx.test(searchInputValue)
                    ? item.codesPostaux
                        .filter((postal) =>
                          postal.startsWith(searchInputValue.toLowerCase())
                        )
                        .map((postal) => (
                          <div
                            key={postal}
                            onClick={() => {
                              onSearchInputValue(`${item.nom} - ${postal}`);
                            }}
                            onKeyDown={() => {}}
                            role="button"
                            tabIndex="0"
                          >
                            {`${item.nom} - ${postal}`}
                          </div>
                        ))
                    : item.codesPostaux.map((postal, index) => (
                        <div
                          key={item.codesPostaux[index]}
                          onClick={() => {
                            onSearchInputValue(
                              `${item.nom} - ${item.codesPostaux[index]}`
                            );
                          }}
                          onKeyDown={() => {}}
                          role="button"
                          tabIndex="0"
                        >
                          {`${item.nom} - ${item.codesPostaux[index]}`}
                        </div>
                      ))}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

Searchbar.propTypes = {
  setCountSearchbar: PropTypes.func,
  countSearchbar: PropTypes.number,
  setCommuneSelectedAdd: PropTypes.func,
  setCityDataAdd: PropTypes.func,
  setCityDataSearch: PropTypes.func,
  cityDataAdd: PropTypes.arrayOf(
    PropTypes.shape({
      cityname: PropTypes.string,
      aptPriceM2: PropTypes.number,
      coordinates: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
      ),
      housePriceM2: PropTypes.number,
      insee: PropTypes.arrayOf(PropTypes.string),
      population: PropTypes.number,
    })
  ),
};
Searchbar.defaultProps = {
  setCountSearchbar: () => {},
  countSearchbar: 0,
  setCommuneSelectedAdd: () => {},
  setCityDataAdd: () => {},
  setCityDataSearch: () => {},
  cityDataAdd: [],
};

export default Searchbar;
