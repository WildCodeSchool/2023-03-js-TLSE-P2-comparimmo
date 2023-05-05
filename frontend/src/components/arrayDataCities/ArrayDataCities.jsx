import { useEffect, useState } from "react";
import axios from "axios";
import "./arrayDataCities.scss";
import { topSixToTenCities } from "../../utils";
// create an array with data of 5 cities
function ArrayDataCities() {
  let cityPopulation = 0;

  // return the population of each city for each code insee (array into file "utils")
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

  // This function fetch the DVF API with the code insee (arrayDataFiveCitiesGeoApi.code). Return the mean price of house for each city
  let propertyValue = 0;
  let builtArea = 0;

  const getDataCityDvfApiHouse = (insee) => {
    const [dataCitiesApiDvfHouse, setDataCitiesApiDvfHouse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      axios
        .get(
          `https://apidf-preprod.cerema.fr/dvf_opendata/mutations?code_insee=${insee}&codtypbien=111&page_size=500`
        )
        .then((results) => {
          setDataCitiesApiDvfHouse(results.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, []);

    let meanPriceHouse = 0;

    if (!isLoading) {
      let sumOfPriceHouse = 0;
      let count = 0;
      for (let i = 0; i < dataCitiesApiDvfHouse.length; i += 1) {
        propertyValue = parseInt(dataCitiesApiDvfHouse[i].valeurfonc, 10);
        builtArea = parseInt(dataCitiesApiDvfHouse[i].sbati, 10);
        if (propertyValue && builtArea) {
          sumOfPriceHouse += propertyValue / builtArea;
          count += 1;
        }
      }
      meanPriceHouse = Math.ceil(sumOfPriceHouse / count);
    }
    return meanPriceHouse;
  };

  // This function fetch the DVF API with the code insee (arrayDataFiveCitiesGeoApi.code). Return the mean price of apartment for each city
  const getDataCityDvfApiApartment = (insee) => {
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
    let meanPriceApartment = 0;
    if (!isLoading) {
      let sumOfPriceApt = 0;
      let count = 0;
      for (let i = 0; i < dataCitiesApiDvfApt.length; i += 1) {
        propertyValue = parseInt(dataCitiesApiDvfApt[i].valeurfonc, 10);
        builtArea = parseInt(dataCitiesApiDvfApt[i].sbati, 10);
        if (propertyValue && builtArea) {
          sumOfPriceApt += propertyValue / builtArea;
          count += 1;
        }
      }
      meanPriceApartment = Math.ceil(sumOfPriceApt / count);
    }
    return meanPriceApartment;
  };

  for (let i = 0; i < topSixToTenCities.length; i += 1) {
    topSixToTenCities[i].population = getDataCityGeoApi(
      topSixToTenCities[i].insee
    );
    topSixToTenCities[i].housePriceM2 = getDataCityDvfApiHouse(
      topSixToTenCities[i].insee
    );
    topSixToTenCities[i].aptPriceM2 = getDataCityDvfApiApartment(
      topSixToTenCities[i].insee
    );
  }

  return (
    <table>
      <caption>
        Top 6 à 11 des plus grandes villes de France*
        <p>Hors communes d'Alsace et Mozelle</p>
      </caption>
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
