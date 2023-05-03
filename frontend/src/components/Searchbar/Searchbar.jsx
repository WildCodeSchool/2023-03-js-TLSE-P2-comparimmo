import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Searchbar({ addCodeInsee, reset, addCoordonnées }) {
  const [commune, setCommune] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  //   Récupération du code postal + mise à jour query pour récupérer le code Insee
  const onSearchCodePostal = (nom, codePostal) => {
    axios
      .get(
        `https://geo.api.gouv.fr/communes?nom=${nom}&codePostal=${codePostal}&fields=code,nom,contour,codesPostaux`
      )
      .then((res) => {
        const filteredResults = res.data.filter(
          (result) => result.nom.length === nom.length
        );
        const codesInsee = filteredResults.map((result) => result.code);
        if (codePostal.startsWith(750)) {
          addCodeInsee(parseInt(codePostal, 10) + 100);
        } else if (codePostal.startsWith(130) || codePostal.startsWith(1301)) {
          addCodeInsee(parseInt(codePostal, 10) + 200);
        } else if (codePostal.startsWith(690)) {
          addCodeInsee(parseInt(codePostal, 10) + 380);
        } else if (codePostal.startsWith(75116)) {
          addCodeInsee(parseInt(codePostal, 10));
        } else {
          codesInsee.forEach((codeInsee) => addCodeInsee(codeInsee));
        }
        const coordinates = res.data.map(
          (result) => result.contour.coordinates
        );
        addCoordonnées(coordinates);
      })

      .catch((err) => {
        console.error(err.message);
      });
  };

  //  Mise à jour texte dans l'input
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
              {/* Bouton pour ajouter des communes */}
              <button
                type="button"
                onClick={() => {
                  const [nom, codePostal] = searchInput.split(" - ");
                  onSearchCodePostal(nom, codePostal);
                  setSearchInput("");
                }}
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => {
                  reset("");
                }}
              >
                Reset
              </button>
            </div>
            <div className="dropdown">
              {/* Permet d'afficher une prérecherche */}
              {commune
                .filter((item) => {
                  const nameCommune = item.nom.toLowerCase();
                  const searchInputLower = searchInput.toLowerCase();
                  const matchName = nameCommune.startsWith(searchInputLower);
                  // On cherche si un élément du tableaux correspond au code postal
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
  addCodeInsee: PropTypes.func,
  reset: PropTypes.func,
  addCoordonnées: PropTypes.func,
};
Searchbar.defaultProps = {
  addCodeInsee: [],
  reset: [],
  addCoordonnées: [],
};

export default Searchbar;
