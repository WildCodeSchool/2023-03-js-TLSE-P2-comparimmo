import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./arrayCitiesInput.scss";

// create an array with data of 5 cities
function ArrayCitiesInput({ cityData, setInseeZoomCity }) {
  // This function fetch the DVF API with the code insee (arrayDataFiveCitiesGeoApi.code). Return the mean price of house for each city
  let propertyValue = 0;
  let builtArea = 0;
  const arrayOfCityObject = cityData;

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

  for (let i = 0; i < arrayOfCityObject.length; i += 1) {
    arrayOfCityObject[i].housePriceM2 = getDataCityDvfApiHouse(
      arrayOfCityObject[i].insee
    );
    arrayOfCityObject[i].aptPriceM2 = getDataCityDvfApiApartment(
      arrayOfCityObject[i].insee
    );
  }

  return (
    <table>
      <caption>Valeurs recherchées</caption>
      <tbody>
        <tr>
          <th scope="col">Communes</th>
          <th scope="col">Prix au m² (maison)</th>
          <th scope="col">Prix au m² (appt)</th>
          <th scope="col">Population</th>
        </tr>
        {arrayOfCityObject.map((el) => {
          return (
            <tr onClick={() => setInseeZoomCity(el.insee)}>
              <th scope="row">{el[0].cityName}</th>
              <td>{el[0].housePriceM2.toLocaleString("fr-FR")} €</td>
              <td>{el[0].aptPriceM2.toLocaleString("fr-FR")} €</td>
              <td>{el[0].population.toLocaleString("fr-FR")} hab</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default ArrayCitiesInput;

ArrayCitiesInput.propTypes = {
  cityData: PropTypes.arrayOf(PropTypes.shape),
  setInseeZoomCity: PropTypes.func,
};
ArrayCitiesInput.defaultProps = {
  cityData: [],
  setInseeZoomCity: () => {},
};
