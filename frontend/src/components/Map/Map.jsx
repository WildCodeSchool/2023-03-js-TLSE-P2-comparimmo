import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import styles from "./Map.module.scss";
import { color1, color2, color3, color4, color5 } from "../../utils";

export default function Map({ propertyType, cityDataSearch }) {
  const [polygonGps, setPolygonGps] = useState([]);
  const [typeOfEstate, setTypeOfEstate] = useState([]);
  const [estateValue, setEstateValue] = useState([]);
  const [dateMutation, setDateMutation] = useState([]);
  const [surfaceArea, setSurfaceArea] = useState([]);
  const [idMutations, setIdMutations] = useState([]);
  const [landArea, setlandArea] = useState([]);
  const [inseeForEachPolygon, setInseeOfEachPolygon] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [arrayOfInseeAddedDatas, setArrayOfInseeAddedDatas] = useState([]);
  let shapeFillColor = "";
  let shapeStrokeColor = "";
  let inseeToAdd = ["54310"];

  if (cityDataSearch.length > 0) {
    inseeToAdd = cityDataSearch.map((el) => el.insee[0]);
  }

  let filters = "";
  if (!propertyType.length) {
    filters = "21%2C111%2C121";
  } else {
    filters = propertyType.toString().split(",").join("%2C");
  }
  // Retrieving data from the API
  useEffect(() => {
    const promisesForEachCitiesToSearch = inseeToAdd.map((insee) => {
      return axios.get(
        `https://apidf-preprod.cerema.fr/dvf_opendata/geomutations/?code_insee=${insee}&page_size=500&codtypbien=${filters}`
      );
    });

    Promise.all(promisesForEachCitiesToSearch)
      .then((results) => {
        const dataFromPromises = results.map((res) => {
          return res.data.features.filter(
            (feature) => feature.geometry !== null
          );
        });
        setArrayOfInseeAddedDatas(dataFromPromises);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [propertyType, cityDataSearch]);

  // reverse geographic coordinates //
  useEffect(() => {
    if (isLoaded) {
      const flatArrayOfInseeAddedDatas = arrayOfInseeAddedDatas.flat();
      const flatPolygons = flatArrayOfInseeAddedDatas.map((feature) => {
        const flatArray = feature.geometry.coordinates.flat();
        flatArray.forEach((a) => a.forEach((b) => b.reverse()));
        return flatArray;
      });

      setPolygonGps(flatPolygons);
      setTypeOfEstate(
        flatArrayOfInseeAddedDatas.map(
          (feature) => feature.properties.libtypbien
        )
      );
      setEstateValue(
        flatArrayOfInseeAddedDatas.map(
          (feature) => feature.properties.valeurfonc
        )
      );
      setDateMutation(
        flatArrayOfInseeAddedDatas.map((feature) => feature.properties.datemut)
      );
      setSurfaceArea(
        flatArrayOfInseeAddedDatas.map((feature) => feature.properties.sbati)
      );
      setIdMutations(
        flatArrayOfInseeAddedDatas.map(
          (feature) => feature.properties.idmutation
        )
      );
      setlandArea(
        flatArrayOfInseeAddedDatas.map((feature) => feature.properties.sterr)
      );
      setInseeOfEachPolygon(
        flatArrayOfInseeAddedDatas.map(
          (feature) => feature.properties.l_codinsee[0]
        )
      );
    }
  }, [arrayOfInseeAddedDatas]);

  const handleColorShape = (index) => {
    switch (inseeForEachPolygon[index]) {
      case inseeToAdd[0]:
        shapeFillColor = color1;
        break;
      case inseeToAdd[1]:
        shapeFillColor = color2;
        break;
      case inseeToAdd[2]:
        shapeFillColor = color3;
        break;
      case inseeToAdd[3]:
        shapeFillColor = color4;
        break;
      case inseeToAdd[4]:
        shapeFillColor = color5;
        break;

      default:
        break;
    }
    return shapeFillColor;
  };

  const handleColorStroke = (index) => {
    switch (inseeForEachPolygon[index]) {
      case inseeToAdd[0]:
        shapeStrokeColor = color1;
        break;
      case inseeToAdd[1]:
        shapeStrokeColor = color2;
        break;
      case inseeToAdd[2]:
        shapeStrokeColor = color3;
        break;
      case inseeToAdd[3]:
        shapeStrokeColor = color4;
        break;
      case inseeToAdd[4]:
        shapeStrokeColor = color5;
        break;

      default:
        break;
    }
    return shapeStrokeColor;
  };

  return (
    <div className={`${styles.mapContent}`}>
      {/*  map settings */}
      <MapContainer
        className={`${styles.map}`}
        center={[46.3622, 1.5231]}
        zoom={6}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="COMPAR'IMMO"
        />
        {/* display of object content on the map: object position and characteristics */}
        {polygonGps.map((polygon, index) => {
          const colorToUseToFill = handleColorShape(index);
          const colorToUseForStroke = handleColorStroke(index);
          return (
            <Polygon
              key={idMutations[index]}
              positions={polygon}
              fillColor={colorToUseToFill}
              color={colorToUseForStroke}
            >
              <Popup>
                {dateMutation[index] ? (
                  <p>
                    <strong>Date de vente:</strong>
                    <br />
                    {new Date(dateMutation[index]).toLocaleDateString("fr-FR")}
                  </p>
                ) : (
                  ""
                )}
                {typeOfEstate[index] ? (
                  <p>
                    <strong>Type de bien:</strong>
                    <br />
                    {typeOfEstate[index].toLocaleLowerCase()}
                  </p>
                ) : (
                  ""
                )}
                {estateValue[index] ? (
                  <p>
                    <strong>Valeur foncière:</strong>
                    <br />
                    {Math.round(estateValue[index]).toLocaleString("fr-FR")} €
                  </p>
                ) : (
                  ""
                )}
                {surfaceArea[index] !== "0.00" ? (
                  <p>
                    <strong>Surface :</strong>
                    <br />
                    {Math.round(surfaceArea[index])} m²
                  </p>
                ) : (
                  ""
                )}
                {landArea[index] > 0 ? (
                  <p>
                    <strong>Surface du terrain:</strong>
                    <br />
                    {Math.round(landArea[index])} m²
                  </p>
                ) : (
                  ""
                )}
                {surfaceArea[index] > 0 && estateValue[index] > 0 ? (
                  <p>
                    <strong>Prix au m²:</strong>
                    <br />
                    {(estateValue[index] / surfaceArea[index]).toFixed(0)} €/m²
                  </p>
                ) : (
                  ""
                )}
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>
    </div>
  );
}

Map.propTypes = {
  propertyType: PropTypes.arrayOf(PropTypes.number),
  cityDataSearch: PropTypes.arrayOf(
    PropTypes.shape({
      cityname: PropTypes.string,
      aptPriceM2: PropTypes.number,
      coordinates: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
      ),
      housePriceM2: PropTypes.number,
      insee: PropTypes.arrayOf(PropTypes.string),
      population: PropTypes.number,
    })
  ),
};
Map.defaultProps = {
  propertyType: [],
  cityDataSearch: [],
};
