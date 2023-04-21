import axios from "axios";
import { useState, useEffect } from "react";
import DataCity from "./DataCity";

function DataDvf() {
  const [count, setCount] = useState();
  const [results, setResults] = useState([]);
  const [isLoadingResults, setIsLoadingResults] = useState(true);

  // first useEffect collect "count" (number of results) of insee code (of city) for house
  useEffect(() => {
    axios
      .get(
        "https://apidf-preprod.cerema.fr/dvf_opendata/mutations/?code_insee=31555&codtypbien=111&anneemut=2022"
      )
      .then((response) => {
        setCount(response.data.count);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    if (count) {
      const nbPagesTotal = Math.ceil(count / 500);
      const promises = []; // Crée un tableau pour stocker les promesses

      for (let i = 0; i < nbPagesTotal; i += 1) {
        // Ajoute chaque promesse à un tableau de promesses
        promises.push(
          axios.get(
            `https://apidf-preprod.cerema.fr/dvf_opendata/mutations/?code_insee=31555&codtypbien=111&page=${
              i + 1
            }&page_size=500&anneemut=2022`
          )
        );
      }

      Promise.all(promises)
        .then((responses) => {
          const allResults = []; // Crée un tableau pour stocker tous les résultats

          // Concatène tous les résultats de chaque réponse dans un seul tableau
          responses.forEach((response) => {
            allResults.push(...response.data.results);
          });

          setResults(allResults);
          setIsLoadingResults(false);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [count]);

  function moyenneCity() {
    let sumOfCity = 0;
    if (!isLoadingResults) {
      for (let i = 0; i < results.length; i += 1) {
        const el = results[i];
        const surfHouse = parseInt(`${el.sbati}`, 10);
        const valeurF = parseInt(`${el.valeurfonc}`, 10);
        const moyHouse = valeurF / surfHouse;

        sumOfCity += moyHouse;
      }
      return sumOfCity / results.length;
    }
    return console.error("No values returned");
  }

  const meanCity = Math.ceil(moyenneCity());

  return (
    <section>
      <h2>Toulouse, prix moyen (maison) : {meanCity} €/m²</h2>
      {isLoadingResults ? (
        <p>Loading...</p>
      ) : (
        results.map((el) => {
          return (
            <DataCity
              key={el.idmutation}
              idbien={el.idmutation}
              sbati={el.sbati}
              valeurfonc={el.valeurfonc}
            />
          );
        })
      )}
      <h1> Code insee de la commune : </h1>
    </section>
  );
}
export default DataDvf;
