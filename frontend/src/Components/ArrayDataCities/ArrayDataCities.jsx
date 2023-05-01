import { useEffect, useState } from "react";
import axios from "axios";
import style from "./ArrayDataCities.scss";

function ArrayDataCities() {
  const topSixToTenCities = [
    {
      id: 1,
      cityName: "Nantes",
      insee: "44109",
      housePriceM2: 0,
      aptPriceM2: 0,
      population: 0,
    },
    {
      id: 2,
      cityName: "Montpellier",
      insee: "34172",
      housePriceM2: 0,
      aptPriceM2: 0,
      population: 0,
    },
    {
      id: 3,
      cityName: "Strasbourg",
      insee: "67482",
      housePriceM2: 0,
      aptPriceM2: 0,
      population: 0,
    },
    {
      id: 4,
      cityName: "Bordeaux",
      insee: "33063",
      housePriceM2: 0,
      aptPriceM2: 0,
      population: 0,
    },
    {
      id: 5,
      cityName: "Lille",
      insee: "59350",
      housePriceM2: 0,
      aptPriceM2: 0,
      population: 0,
    },
  ];

  let cityPopulation = 0;

  const getDataCityGeoApi = (insee) => {
    const [DataCitiesGeoApi, setDataCitiesGeoApi] = useState("0");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      axios
        .get(`https://geo.api.gouv.fr/communes/${insee}`)
        .then((results) => {
          setDataCitiesGeoApi(results.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, []);

    if (!isLoading) {
      cityPopulation = DataCitiesGeoApi.population;
    }

    return cityPopulation;
  };

  // This function fetch the DVF API with the code insee (arrayDataFiveCitiesGeoApi.code). Return an array of objects wich contains arrays (count)
  let valfonc = 0;
  let sBati = 0;
  let priceSquareMeter = 0;
  const getDataCityDvfApi = (insee) => {
    const [dataCitiesApiDvf, setDataCitiesApiDvf] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      axios
        .get(
          `https://apidf-preprod.cerema.fr/dvf_opendata/mutations?code_insee=${insee}&codtypbien=111&page_size=500`
        )
        .then((results) => {
          const dataPromises = results.map((res) => res.data.results);
          setDataCitiesApiDvf(dataPromises);
          console.warn(dataPromises);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, []);
    if (!isLoading) {
      valfonc = parseInt(dataCitiesApiDvf.valeurfonc, 10);
      sBati = parseInt(dataCitiesApiDvf.sbati, 10);
      priceSquareMeter = valfonc / sBati;
    }
    return priceSquareMeter;
  };

  for (let i = 0; i < topSixToTenCities.length; i += 1) {
    topSixToTenCities[i].population = getDataCityGeoApi(
      topSixToTenCities[i].insee
    );
    topSixToTenCities[i].housePriceM2 = getDataCityDvfApi(
      topSixToTenCities[i].insee
    );
  }

  console.warn(topSixToTenCities[0].housePriceM2);
  return (
    <table>
      <caption>top 6 à 10 des plus grandes villes de France</caption>
      <tr>
        <th scope="col">Communes</th>
        <th scope="col">Prix au m² (maison)</th>
        <th scope="col">Prix au m² (appt)</th>
        <th scope="col">Population</th>
      </tr>
      <tr>
        <th scope="row">{topSixToTenCities[0].cityName}</th>
        <td>{topSixToTenCities[0].housePriceM2}</td>
        <td>{topSixToTenCities[0].aptPriceM2}</td>
        <td>{topSixToTenCities[0].population}</td>
      </tr>
      <tr>
        <th scope="row">{topSixToTenCities[1].cityName}</th>
        <td>{topSixToTenCities[1].housePriceM2}</td>
        <td>{topSixToTenCities[1].aptPriceM2}</td>
        <td>{topSixToTenCities[1].population}</td>
      </tr>
      <tr>
        <th scope="row">{topSixToTenCities[2].cityName}</th>
        <td>{topSixToTenCities[2].housePriceM2}</td>
        <td>{topSixToTenCities[2].aptPriceM2}</td>
        <td>{topSixToTenCities[2].population}</td>
      </tr>
      <tr>
        <th scope="row">{topSixToTenCities[3].cityName}</th>
        <td>{topSixToTenCities[3].housePriceM2}</td>
        <td>{topSixToTenCities[3].aptPriceM2}</td>
        <td>{topSixToTenCities[3].population}</td>
      </tr>
      <tr>
        <th scope="row">{topSixToTenCities[4].cityName}</th>
        <td>{topSixToTenCities[4].housePriceM2}</td>
        <td>{topSixToTenCities[4].aptPriceM2}</td>
        <td>{topSixToTenCities[4].population}</td>
      </tr>
    </table>
  );
}
export default ArrayDataCities;
