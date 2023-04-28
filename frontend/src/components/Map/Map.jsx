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
  const [codeInsee, setCodeInsee] = useState("31555");
  const [landArea, setlandArea] = useState([]);

  /* change code insee button */
  const handleCodeInseeChange = (event) => {
    setCodeInsee(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  let filters = "";
  if (!propertyType.length) {
    filters = "21%2C111%2C121";
  } else {
    filters = propertyType.toString().split(",").join("%2C");
  }
  // Retrieving data from the API
  useEffect(() => {
    axios
      .get(
        `https://apidf-preprod.cerema.fr/dvf_opendata/geomutations/?code_insee=${codeInsee}&page_size=500&codtypbien=${filters}`
      )
      .then((response) => {
        const filteredFeatures = response.data.features.filter(
          (feature) => feature.geometry !== null
        );

        // reverse geographic coordinates //

        const flatPolygons = filteredFeatures.map((feature) => {
          const flatArray = feature.geometry.coordinates.flat();
          flatArray.forEach((a) => a.forEach((b) => b.reverse()));
          return flatArray;
        });

        const { features } = response.data;

        setPolygonGps(flatPolygons);
        setTypeOfEstate(
          features.map((feature) => feature.properties.libtypbien)
        );
        setEstateValue(
          features.map((feature) => feature.properties.valeurfonc)
        );
        setDateMutation(features.map((feature) => feature.properties.datemut));
        setSurfaceArea(features.map((feature) => feature.properties.sbati));
        setIdMutations(
          features.map((feature) => feature.properties.idmutation)
        );
        setlandArea(features.map((feature) => feature.properties.sterr));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [codeInsee, propertyType]);
  return (
    <div className={`${styles.mapContent}  `}>
      <form onSubmit={handleSubmit}>
        <label>
          Code INSEE :
          <input
            type="text"
            value={codeInsee}
            onChange={handleCodeInseeChange}
          />
        </label>
        <button type="submit">Change</button>
      </form>
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
