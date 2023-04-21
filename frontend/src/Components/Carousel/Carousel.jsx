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
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import "./carousel.scss";

export default function Carousel() {
  let cityPopulation = 0;
  const cities = [
    {
      id: 1,
      cityName: "Nice",
      insee: "06088",
      inseeDVF: ["06088"],
      housePriceM2: 0,
      flatPriceM2: 0,
      population: 0,
    },
    {
      id: 2,
      cityName: "Toulouse",
      insee: "31555",
      inseeDVF: ["31555"],
      housePriceM2: 0,
      flatPriceM2: 0,
      population: 0,
    },
    {
      id: 3,
      cityName: "Lyon",
      insee: "69123",
      inseeDVF: [
        "69381",
        "69382",
        "69383",
        "69384",
        "69385",
        "69386",
        "69387",
        "69388",
        "69389",
      ],
      housePriceM2: 0,
      flatPriceM2: 0,
      population: 0,
    },
    {
      id: 4,
      cityName: "Marseille",
      insee: "13055",
      inseeDVF: [
        "13201",
        "13202",
        "13203",
        "13204",
        "13205",
        "13206",
        "13207",
        "13208",
        "13209",
        "13210",
        "13211",
        "13212",
        "13213",
        "13214",
        "13215",
        "13216",
      ],
      housePriceM2: 0,
      flatPriceM2: 0,
      population: 0,
    },
    {
      id: 5,
      cityName: "Paris",
      insee: "75056",
      inseeDVF: [
        "75101",
        "75102",
        "75103",
        "75104",
        "75105",
        "75106",
        "75107",
        "75108",
        "75109",
        "75110",
        "75111",
        "75112",
        "75113",
        "75114",
        "75115",
        "75116",
        "75117",
        "75118",
        "75119",
        "75120",
      ],
      housePriceM2: 0,
      flatPriceM2: 0,
      population: 0,
    },
  ];

  const dataCommune = (inseeToSearch) => {
    const [commune, setCommune] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      axios
        .get(`https://geo.api.gouv.fr/communes/${inseeToSearch}`)
        .then((res) => {
          setCommune(res.data);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, []);

    if (isLoaded) {
      cityPopulation = commune.population;
    }

    return cityPopulation;
  };

  const dataFlat = (inseeDVFToSearch) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [tabValues, setTabValues] = useState([]);

    useEffect(() => {
      const promises = inseeDVFToSearch.map((el) => {
        return axios.get(
          `https://apidf-preprod.cerema.fr/dvf_opendata/mutations?code_insee=${el}&codtypbien=121&page_size=500`
        );
      });

      Promise.all(promises)
        .then((results) => {
          const allData = results.map((res) => res.data.results);
          setTabValues(allData);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, []);

    let meanPriceM2 = 0;
    if (isLoaded) {
      const datas = tabValues.flat();
      const lenDatas = datas.length;
      let sumPricem2 = 0;
      for (let i = 0; i < datas.length; i += 1) {
        const foncValue = parseInt(datas[i].valeurfonc, 10);
        const surfaceValue = parseInt(datas[i].sbati, 10);
        if (foncValue && surfaceValue) {
          sumPricem2 += foncValue / surfaceValue;
        }
      }
      meanPriceM2 = Math.ceil(sumPricem2 / parseInt(lenDatas, 10));
    }
    return meanPriceM2;
  };

  const dataHouse = (inseeDVFToSearch) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [tabValues, setTabValues] = useState([]);

    useEffect(() => {
      const promises = inseeDVFToSearch.map((el) => {
        return axios.get(
          `https://apidf-preprod.cerema.fr/dvf_opendata/mutations?code_insee=${el}&codtypbien=111&page_size=500`
        );
      });

      Promise.all(promises)
        .then((results) => {
          const allData = results.map((res) => res.data.results);
          setTabValues(allData);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, []);

    let meanPriceM2 = 0;
    if (isLoaded) {
      const datas = tabValues.flat();
      const lenDatas = datas.length;
      let sumPricem2 = 0;
      for (let i = 0; i < datas.length; i += 1) {
        const foncValue = parseInt(datas[i].valeurfonc, 10);
        const surfaceValue = parseInt(datas[i].sbati, 10);
        if (foncValue && surfaceValue) {
          sumPricem2 += foncValue / surfaceValue;
        }
      }
      meanPriceM2 = Math.ceil(sumPricem2 / parseInt(lenDatas, 10));
    }
    return meanPriceM2;
  };

  for (let i = 0; i < cities.length; i += 1) {
    const el = cities[i].insee;
    const elDVF = cities[i].inseeDVF;
    cities[i].population = dataCommune(el);
    cities[i].flatPriceM2 = dataFlat(elDVF);
    cities[i].housePriceM2 = dataHouse(elDVF);
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
        {cities.map((el) => {
          return (
            <SplideSlide
              className="carouselSplide"
              key={el.id}
              data-splide-interval="3000"
            >
              <h2 className="cityCarousel">{el.cityName}</h2>
              <div className="cityList">
                <div className="iconAndText">
                  <img src={house} alt="Icon of a house" />
                  <h3 className="dataCarousel">
                    {el.housePriceM2.toLocaleString("fr-FR")} €/m²
                  </h3>
                </div>
                <div className="iconAndText">
                  <img src={flat} alt="Icon of an appartment" />
                  <h3 className="dataCarousel">
                    {el.flatPriceM2.toLocaleString("fr-FR")} €/m²
                  </h3>
                </div>
                <div className="iconAndText">
                  <img src={pop} alt="Icon for population section" />
                  <h3 className="dataCarousel">
                    {el.population.toLocaleString("fr-FR")} habitants
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
