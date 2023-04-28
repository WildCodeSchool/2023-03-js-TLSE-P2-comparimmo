import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Searchbar({ setCodeInsee }) {
  const [commune, setCommune] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [queryCommune, setqueryCommune] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  //   Récupération du code postal + mise à jour query
  const onSearchCodePostal = (nom, codePostal) => {
    setqueryCommune(`?nom=${nom}&codePostal=${codePostal}`);
  };

  //  Mise à jour texte dans l'input
  const onSearchInput = (value) => {
    setSearchInput(value);
  };

  useEffect(() => {
    axios
      .get(`https://geo.api.gouv.fr/communes${queryCommune}`)
      .then((res) => {
        setCommune(res.data);
        setIsLoaded(true);
        setCodeInsee(res.data.map((result) => result.code));
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [queryCommune]);

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
              <button
                type="button"
                onClick={() => {
                  setqueryCommune("");
                  setSearchInput("");
                }}
              >
                Reset
              </button>
            </div>
            <div className="dropdown">
              {commune
                .filter((item) => {
                  const nameCommune = item.nom.toLowerCase();
                  const searchInputLower = searchInput.toLowerCase();
                  const matchName = nameCommune.startsWith(searchInputLower);
                  const matchCodePostal = item.codesPostaux.some((postal) =>
                    postal.startsWith(searchInputLower)
                  );
                  return searchInputLower && (matchName || matchCodePostal);
                })
                .map((item) => (
                  <div className="dropdown-row" key={commune.siren}>
                    {item.codesPostaux.map((postal, index) => (
                      <div
                        key={item.codesPostaux[index]}
                        onClick={() => {
                          onSearchInput(
                            `${item.nom} - ${item.codesPostaux[index]}`
                          );
                          onSearchCodePostal(
                            item.nom,
                            item.codesPostaux[index]
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
  setCodeInsee: PropTypes.node,
};
Searchbar.defaultProps = {
  setCodeInsee: [],
};

export default Searchbar;
