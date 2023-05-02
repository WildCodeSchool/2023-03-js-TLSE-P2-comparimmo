import { useEffect, useState } from "react";
import axios from "axios";
import "./ArrayDataCities.scss";

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
      cityName: "Bordeaux",
      insee: "33063",
      housePriceM2: 0,
      aptPriceM2: 0,
      population: 0,
    },
    {
      id: 4,
      cityName: "Lille",
      insee: "59350",
      housePriceM2: 0,
      aptPriceM2: 0,
      population: 0,
    },
    {
      id: 5,
      cityName: "Rennes",
      insee: "35238",
      housePriceM2: 0,
      aptPriceM2: 0,
      population: 0,
    },
  ];

  let cityPopulation = 0;

  // return the population of each city for each code insee
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

  const getDataCityDvfApi = (insee) => {
    const [dataCitiesApiDvf, setDataCitiesApiDvf] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      axios
        .get(
          `https://apidf-preprod.cerema.fr/dvf_opendata/mutations?code_insee=${insee}&codtypbien=111&page_size=500`
        )
        .then((results) => {
          setDataCitiesApiDvf(results.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, []);
    let moyOfPriceHouse = 0;
    if (!isLoading) {
      let sumOfPriceHouse = 0;
      let count = 0;
      for (let i = 0; i < dataCitiesApiDvf.length; i += 1) {
        valfonc = parseInt(dataCitiesApiDvf[i].valeurfonc, 10);
        sBati = parseInt(dataCitiesApiDvf[i].sbati, 10);
        if (valfonc && sBati) {
          sumOfPriceHouse += valfonc / sBati;
          count += 1;
        }
      }
      moyOfPriceHouse = Math.ceil(sumOfPriceHouse / count);
    }
    return moyOfPriceHouse;
  };

  const getDataCityDvfApiApt = (insee) => {
    const [dataCitiesApiDvfApt, setDataCitiesApiDvfApt] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      axios
        .get(
          `https://apidf-preprod.cerema.fr/dvf_opendata/mutations?code_insee=${insee}&codtypbien=121&page_size=500`
        )
        .then((results) => {
          setDataCitiesApiDvfApt(results.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, []);
    let moyOfPriceApt = 0;
    if (!isLoading) {
      let sumOfPriceApt = 0;
      let count = 0;
      for (let i = 0; i < dataCitiesApiDvfApt.length; i += 1) {
        valfonc = parseInt(dataCitiesApiDvfApt[i].valeurfonc, 10);
        sBati = parseInt(dataCitiesApiDvfApt[i].sbati, 10);
        if (valfonc && sBati) {
          sumOfPriceApt += valfonc / sBati;
          count += 1;
        }
      }
      moyOfPriceApt = Math.ceil(sumOfPriceApt / count);
    }
    return moyOfPriceApt;
  };

  for (let i = 0; i < topSixToTenCities.length; i += 1) {
    topSixToTenCities[i].population = getDataCityGeoApi(
      topSixToTenCities[i].insee
    );
    topSixToTenCities[i].housePriceM2 = getDataCityDvfApi(
      topSixToTenCities[i].insee
    );
    topSixToTenCities[i].aptPriceM2 = getDataCityDvfApiApt(
      topSixToTenCities[i].insee
    );
  }

  return (
    <table>
      <caption>top 6 à 10 des plus grandes villes de France</caption>
      <tbody>
        <tr>
          <th scope="col">Communes</th>
          <th scope="col">Prix au m² (maison)</th>
          <th scope="col">Prix au m² (appt)</th>
          <th scope="col">Population</th>
        </tr>
        <tr>
          <th scope="row">{topSixToTenCities[0].cityName}</th>
          <td>{topSixToTenCities[0].housePriceM2.toLocaleString("fr-FR")} €</td>
          <td>{topSixToTenCities[0].aptPriceM2.toLocaleString("fr-FR")} €</td>
          <td>{topSixToTenCities[0].population.toLocaleString("fr-FR")} hab</td>
        </tr>
        <tr>
          <th scope="row">{topSixToTenCities[1].cityName}</th>
          <td>{topSixToTenCities[1].housePriceM2.toLocaleString("fr-FR")} €</td>
          <td>{topSixToTenCities[1].aptPriceM2.toLocaleString("fr-FR")} €</td>
          <td>{topSixToTenCities[1].population.toLocaleString("fr-FR")} hab</td>
        </tr>
        <tr>
          <th scope="row">{topSixToTenCities[2].cityName}</th>
          <td>{topSixToTenCities[2].housePriceM2.toLocaleString("fr-FR")} €</td>
          <td>{topSixToTenCities[2].aptPriceM2.toLocaleString("fr-FR")} €</td>
          <td>{topSixToTenCities[2].population.toLocaleString("fr-FR")} hab</td>
        </tr>
        <tr>
          <th scope="row">{topSixToTenCities[3].cityName}</th>
          <td>{topSixToTenCities[3].housePriceM2.toLocaleString("fr-FR")} €</td>
          <td>{topSixToTenCities[3].aptPriceM2.toLocaleString("fr-FR")} €</td>
          <td>{topSixToTenCities[3].population.toLocaleString("fr-FR")} hab</td>
        </tr>
        <tr>
          <th scope="row">{topSixToTenCities[4].cityName}</th>
          <td>{topSixToTenCities[4].housePriceM2.toLocaleString("fr-FR")} €</td>
          <td>{topSixToTenCities[4].aptPriceM2.toLocaleString("fr-FR")} €</td>
          <td>{topSixToTenCities[4].population.toLocaleString("fr-FR")} hab</td>
        </tr>
      </tbody>
    </table>
  );
}
export default ArrayDataCities;
