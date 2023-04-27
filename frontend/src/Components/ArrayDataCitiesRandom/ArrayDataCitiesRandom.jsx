import { useEffect, useState } from "react";
import axios from "axios";

function ArrayDataCitiesRandom() {
  const [allDataCitiesGeoApi, setAllDataCitiesGeoApi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the API geo.api in order to return data (name, population, code) fo each city in France

  useEffect(() => {
    axios
      .get(`https://geo.api.gouv.fr/communes?&fields=nom,population,code`)
      .then((results) => {
        setAllDataCitiesGeoApi(results.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  console.warn(allDataCitiesGeoApi);

  // // This function return an array of 5 random number between 0 and number of cities in France (allDataCitiesGeoApi.lenght)
  // const randomCities = [];
  // function getRandomNumberCities() {
  //   const numberOfCitiesFrance = allDataCitiesGeoApi.length;
  //   for (let i = 0; i < 5; i += 1) {
  //     randomCities.push(Math.floor(Math.random() * numberOfCitiesFrance));
  //   }
  //   return randomCities;
  // }

  // console.warn(getRandomNumberCities());

  const topSixToTenCities = [
    {
      id: 1,
      cityName: "Nantes",
      insee: "",
      housePriceM2: 0,
      flatPriceM2: 0,
      population: 0,
    },
    {
      id: 2,
      cityName: "Montpellier",
      insee: "",
      housePriceM2: 0,
      flatPriceM2: 0,
      population: 0,
    },
    {
      id: 3,
      cityName: "Strasbourg",
      insee: "",
      housePriceM2: 0,
      flatPriceM2: 0,
      population: 0,
    },
    {
      id: 4,
      cityName: "Bordeaux",
      insee: "",
      housePriceM2: 0,
      flatPriceM2: 0,
      population: 0,
    },
    {
      id: 5,
      cityName: "Lille",
      insee: "",
      housePriceM2: 0,
      flatPriceM2: 0,
      population: 0,
    },
  ];

  // This function return an array of 5 random cities (name, population, code)
  function getArrayDataFiveCitiesGeoApi() {
    const arrayDataFiveCitiesGeoApi = [];
    for (let i = 0; i < topSixToTenCities.length; i += 1) {
      const cityData = allDataCitiesGeoApi[topSixToTenCities[i]];
      arrayDataFiveCitiesGeoApi.push(cityData);
    }
    return arrayDataFiveCitiesGeoApi;
  }

  const codeCity = [];
  if (!isLoading) {
    const arrayDataGeoApi = getArrayDataFiveCitiesGeoApi();
    for (let i = 0; i < arrayDataGeoApi.length; i += 1) {
      codeCity.push(arrayDataGeoApi[i].code);
    }
    console.warn(codeCity);
  }

  // This function fetch the DVF API with the code insee (arrayDataFiveCitiesGeoApi.code). Return an array of objects wich contains arrays (count)

  const [dataCityApiDvf, setDataCityApiDvf] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const promisesForEachCity = codeCity.map((code) => {
      return axios.get(
        `https://apidf-preprod.cerema.fr/dvf_opendata/mutations?code_insee=${code}&codtypbien=121&page_size=500`
      );
    });

    Promise.all(promisesForEachCity)
      .then((results) => {
        const dataFromPromises = results.map((res) => res.data);
        setDataCityApiDvf(dataFromPromises);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  if (isLoaded) {
    console.warn(dataCityApiDvf);
  }

  return <p>coucou</p>;
}
export default ArrayDataCitiesRandom;
