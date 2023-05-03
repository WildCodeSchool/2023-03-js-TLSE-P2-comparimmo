import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Searchbar({ setCodeInsee, setCoordinates }) {
  const [commune, setCommune] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [count, setCount] = useState(0);

  const handleAddCodeInsee = (code) => {
    setCodeInsee((prevCodeInsee) => [...prevCodeInsee, code]); // Add Insee Code to the table
  };

  const handleAddCoordinates = (code) => {
    setCoordinates((prevCoordinates) => [...prevCoordinates, code]); // Add coordinates to the table
  };

  const handleReset = () => {
    setCodeInsee([]);
    setCoordinates([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  //   Update query to recove Insee Code
  const onSearchCodePostal = (communeName, codePostal) => {
    axios
      .get(
        `https://geo.api.gouv.fr/communes?nom=${communeName}&codePostal=${codePostal}&fields=code,nom,contour,codesPostaux`
      )
      .then((res) => {
        const filteredResults = res.data.filter(
          (result) => result.nom.length === communeName.length
        );
        const codesInsee = filteredResults.map((result) => result.code);
        if (codePostal.startsWith(750)) {
          handleAddCodeInsee(parseInt(codePostal, 10) + 100);
        } else if (codePostal.startsWith(130) || codePostal.startsWith(1301)) {
          handleAddCodeInsee(parseInt(codePostal, 10) + 200);
        } else if (codePostal.startsWith(690)) {
          handleAddCodeInsee(parseInt(codePostal, 10) + 380);
        } else if (codePostal.startsWith(75116)) {
          handleAddCodeInsee(parseInt(codePostal, 10));
        } else {
          codesInsee.forEach((codeInsee) => handleAddCodeInsee(codeInsee));
        }
        const coordinates = res.data.map(
          (result) => result.contour.coordinates
        );
        handleAddCoordinates(coordinates);
      })

      .catch((err) => {
        console.error(err.message);
      });
  };

  //  Update input text
  const onSearchInput = (value) => {
    setSearchInput(value);
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
      {isLoaded ? (
        <div>
          <div className="search-container">
            <div className="search-inner">
              <input
                type="text"
                placeholder="Commune / Code Postal"
                onChange={handleSearch}
                value={searchInput}
              />
              {count >= 5 && <p>Maximum 5 communes</p>}
              <button
                type="button"
                onClick={() => {
                  const [communeName, codePostal] = searchInput.split(" - ");
                  onSearchCodePostal(communeName, codePostal);
                  setSearchInput("");
                  setCount(count + 1);
                }}
                disabled={count >= 5}
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => {
                  handleReset("");
                  setCount(0);
                }}
              >
                Reset
              </button>
            </div>
            <div className="dropdown">
              {/* 
Allows you to display a pre-searche */}
              {commune
                .filter((item) => {
                  const communeName = item.nom.toLowerCase();
                  const searchInputLower = searchInput.toLowerCase();
                  const matchName = communeName.startsWith(searchInputLower);
                  // Search if one of element correspond to code postal
                  const matchCodePostal = item.codesPostaux.some((postal) =>
                    postal.startsWith(searchInputLower)
                  );
                  return searchInputLower && (matchName || matchCodePostal);
                })
                .map((item) => (
                  <div className="dropdown-row" key={item.code}>
                    {regEx.test(searchInput)
                      ? item.codesPostaux
                          .filter((postal) =>
                            postal.startsWith(searchInput.toLowerCase())
                          )
                          .map((postal) => (
                            <div
                              key={postal}
                              onClick={() => {
                                onSearchInput(`${item.nom} - ${postal}`);
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
                              onSearchInput(
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
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

Searchbar.propTypes = {
  setCodeInsee: PropTypes.func,
  setCoordinates: PropTypes.func,
};
Searchbar.defaultProps = {
  setCodeInsee: () => {},
  setCoordinates: () => {},
};

export default Searchbar;
