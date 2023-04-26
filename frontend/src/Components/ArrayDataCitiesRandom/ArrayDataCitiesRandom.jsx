import { useEffect, useState } from "react";
import axios from "axios";

function ArrayDataCitiesRandom() {
  const [allDataCities, setAllDataCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the API geo.api in order to return data (name, population, code) fo each city in France
  useEffect(() => {
    axios
      .get(`https://geo.api.gouv.fr/communes?&fields=nom,population,code`)
      .then((results) => {
        setAllDataCities(results.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  console.info(allDataCities);
  console.info(isLoading);

  // This function take a random number between 0 and 34945 (number of cities in France)
  const randomCities = [];
  function getRandomNumberCities() {
    const numberOfCitiesFrance = allDataCities.length;
    for (let i = 0; i < 5; i += 1) {
      randomCities.push(Math.floor(Math.random() * numberOfCitiesFrance));
    }
    return randomCities;
  }
  console.warn(getRandomNumberCities());
  // console.log(randomCities);

  return randomCities;
}

export default ArrayDataCitiesRandom;
