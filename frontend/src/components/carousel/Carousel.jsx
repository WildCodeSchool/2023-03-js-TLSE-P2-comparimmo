import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// eslint-disable-next-line import/no-unresolved
import house from "@assets/img/house.png";
// eslint-disable-next-line import/no-unresolved
import flat from "@assets/img/flat.png";
// eslint-disable-next-line import/no-unresolved
import pop from "@assets/img/pop.png";
// eslint-disable-next-line import/no-unresolved
import "@splidejs/react-splide/css/skyblue";
import axios from "axios";
import "./carousel.scss";
import cities from "../../utils";

export default function Carousel() {
  let cityPopulation = 0;

  // getPopulationForEachCity receive the INSEE code to get the population info from geo API for each city of the top 5 in the const cities
  const getPopulationForEachCity = (inseeToSearch) => {
    const [city, setCity] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      axios
        .get(`https://geo.api.gouv.fr/communes/${inseeToSearch}`)
        .then((res) => {
          setCity(res.data);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, []);

    if (isLoaded) {
      cityPopulation = city.population;
    }

    return cityPopulation;
  };

  // getFlatDatasForEachCity receive all INSEE code for each City (array with every district for the biggest 3), et return the mean of square meter price for flats for each city
  const getFlatDatasForEachCity = (inseeDVFToSearch) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [arrayOfDistrictsDatas, setArrayOfDistrictsDatas] = useState([]);

    useEffect(() => {
      const promisesForEachDistrict = inseeDVFToSearch.map((inseeDVF) => {
        return axios.get(
          `https://apidf-preprod.cerema.fr/dvf_opendata/mutations?code_insee=${inseeDVF}&codtypbien=121&page_size=500`
        );
      });

      Promise.all(promisesForEachDistrict)
        .then((results) => {
          const dataFromPromises = results.map((res) => res.data.results);
          setArrayOfDistrictsDatas(dataFromPromises);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, []);

    let meanFlatPriceM2 = 0;
    if (isLoaded) {
      const concatenedDistrictsDatas = arrayOfDistrictsDatas.flat();
      let sumPriceM2 = 0;
      for (let i = 0; i < concatenedDistrictsDatas.length; i += 1) {
        const landValue = parseInt(concatenedDistrictsDatas[i].valeurfonc, 10);
        const surfaceValue = parseInt(concatenedDistrictsDatas[i].sbati, 10);
        if (landValue && surfaceValue) {
          sumPriceM2 += landValue / surfaceValue;
        }
      }
      meanFlatPriceM2 = Math.ceil(
        sumPriceM2 / parseInt(concatenedDistrictsDatas.length, 10)
      );
    }
    return meanFlatPriceM2;
  };

  // getHouseDatasForEachCity receive all INSEE code for each City (array with every district for the biggest 3), et return the mean of square meter price for houses for each city
  const getHouseDatasForEachCity = (inseeDVFToSearch) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [arrayOfDistrictsDatas, setArrayOfDistrictsData] = useState([]);

    useEffect(() => {
      const promisesForEachDistrict = inseeDVFToSearch.map((inseeDVF) => {
        return axios.get(
          `https://apidf-preprod.cerema.fr/dvf_opendata/mutations?code_insee=${inseeDVF}&codtypbien=111&page_size=500`
        );
      });

      Promise.all(promisesForEachDistrict)
        .then((results) => {
          const dataFromPromises = results.map((res) => res.data.results);
          setArrayOfDistrictsData(dataFromPromises);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, []);

    let meanHousePriceM2 = 0;
    if (isLoaded) {
      const concatenedDistrictsDatas = arrayOfDistrictsDatas.flat();
      let sumPriceM2 = 0;
      for (let i = 0; i < concatenedDistrictsDatas.length; i += 1) {
        const landValue = parseInt(concatenedDistrictsDatas[i].valeurfonc, 10);
        const surfaceValue = parseInt(concatenedDistrictsDatas[i].sbati, 10);
        if (landValue && surfaceValue) {
          sumPriceM2 += landValue / surfaceValue;
        }
      }
      meanHousePriceM2 = Math.ceil(
        sumPriceM2 / parseInt(concatenedDistrictsDatas.length, 10)
      );
    }
    return meanHousePriceM2;
  };

  for (let i = 0; i < cities.length; i += 1) {
    cities[i].population = getPopulationForEachCity(cities[i].insee);
    cities[i].flatPriceM2 = getFlatDatasForEachCity(cities[i].inseeDVF);
    cities[i].housePriceM2 = getHouseDatasForEachCity(cities[i].inseeDVF);
  }

  const optionSplide = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    pauseOnHover: true,
    resetProgress: false,
  };

  return (
    <div className="carousel">
      <Splide className="carouselContainer" options={optionSplide}>
        {cities.map((city) => {
          return (
            <SplideSlide
              className="carouselSplide"
              key={city.id}
              data-splide-interval="3000"
            >
              <h2 className="cityCarousel">{city.cityName}</h2>
              <div className="cityList">
                <div className="iconAndText">
                  <img src={house} alt="Icon of a house" />
                  <h3 className="dataCarousel">
                    {city.housePriceM2.toLocaleString("fr-FR")} €/m²
                  </h3>
                </div>
                <div className="iconAndText">
                  <img src={flat} alt="Icon of an appartment" />
                  <h3 className="dataCarousel">
                    {city.flatPriceM2.toLocaleString("fr-FR")} €/m²
                  </h3>
                </div>
                <div className="iconAndText">
                  <img src={pop} alt="Icon for population section" />
                  <h3 className="dataCarousel">
                    {city.population.toLocaleString("fr-FR")} habitants
                  </h3>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}
