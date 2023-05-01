import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import styles from "./Map.module.scss";

export default function Map({ propertyType }) {
  const [polygonGps, setPolygonGps] = useState([]);
  const [typeOfEstate, setTypeOfEstate] = useState([]);
  const [estateValue, setEstateValue] = useState([]);
  const [dateMutation, setDateMutation] = useState([]);
  const [surfaceArea, setSurfaceArea] = useState([]);
  const [idMutations, setIdMutations] = useState([]);
  const [landArea, setlandArea] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [arrayOfInseeAddedDatas, setArrayOfInseeAddedDatas] = useState([]);

  const inseeToAdd = [31445, 31555];

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
  }, [propertyType]);

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
    }
  }, [arrayOfInseeAddedDatas]);
  return (
    <div className={`${styles.mapContent}`}>
      {/*  map settings */}
      <MapContainer
        className={`${styles.map}`}
        center={[43.6, 1.433333]}
        zoom={12}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="COMPAR'IMMO"
        />
        {/* display of object content on the map: object position and characteristics */}
        {polygonGps.map((polygon, index) => (
          <Polygon key={idMutations[index]} positions={polygon}>
            <Popup>
              {dateMutation[index] ? (
                <p>
                  <strong>Date de mutation:</strong>
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
        ))}
      </MapContainer>
    </div>
  );
}

Map.propTypes = {
  propertyType: PropTypes.arrayOf(PropTypes.number),
};
Map.defaultProps = {
  propertyType: [],
};
