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
  console.warn(allDataCities);
  console.warn(isLoading);

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
  console.warn(randomCities);

  // This function return an array of 5 random cities (name, population, code)
  const arrayFinalDataCities = [];
  function getArrayFinalDataCities() {
    for (let i = 0; i < randomCities.length; i += 1) {
      const randomCity = randomCities[i];
      arrayFinalDataCities.push(allDataCities[randomCity]);
    }
    return arrayFinalDataCities;
  }
  console.warn(getArrayFinalDataCities());

  return <p>coucou</p>;
}

export default ArrayDataCitiesRandom;
