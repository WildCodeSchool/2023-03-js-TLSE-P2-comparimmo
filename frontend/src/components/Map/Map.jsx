import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import styles from "./Map.module.scss";

export default function Map({
  sbati,
  datemut,
  libtypbien,
  idmutations,
  polygons,
  sterr,
  valeurfonc,
  codeInsee,
}) {
  const [polygonsState, setPolygonsState] = useState(polygons || "");
  const [libtypbienState, setLibtypbienState] = useState(libtypbien || []);
  const [valeurfoncState, setValeurfoncState] = useState(valeurfonc || "");
  const [datemutState, setDatemutState] = useState(datemut || "");
  const [sbatiState, setSbatiState] = useState(sbati || "");
  const [idmutationsState, setIdmutationsState] = useState(idmutations || "");
  const [codeInseeState, setCodeInseeState] = useState(codeInsee || "");
  const [sterrState, setSterrState] = useState(sterr || "");

  /* change code insee button */
  const handleCodeInseeChange = (event) => {
    setCodeInseeState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Retrieving data from the API
  useEffect(() => {
    axios
      .get(
        `https://apidf-preprod.cerema.fr/dvf_opendata/geomutations/?code_insee=${codeInseeState}&page_size=500&codtypbien=121,111`
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

        setPolygonsState(flatPolygons);
        setLibtypbienState(
          features.map((feature) => feature.properties.libtypbien)
        );
        setValeurfoncState(
          features.map((feature) => feature.properties.valeurfonc)
        );
        setDatemutState(features.map((feature) => feature.properties.datemut));
        setSbatiState(features.map((feature) => feature.properties.sbati));
        setIdmutationsState(
          features.map((feature) => feature.properties.idmutation)
        );
        setSterrState(features.map((feature) => feature.properties.sterr));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [codeInseeState]);
  return (
    <div className={`${styles.mapContent}  `}>
      <form onSubmit={handleSubmit}>
        <label>
          Code INSEE :
          <input
            type="text"
            value={codeInseeState}
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
        {polygonsState.map((polygon, index) => (
          <Polygon key={idmutationsState[index]} positions={polygon}>
            <Popup>
              {datemutState[index] ? (
                <p>
                  <strong>Date de mutation:</strong>
                  <br />
                  {new Date(datemutState[index]).toLocaleDateString("fr-FR")}
                </p>
              ) : (
                ""
              )}
              {libtypbienState[index] ? (
                <p>
                  <strong>Type de bien:</strong>
                  <br />
                  {libtypbienState[index].toLocaleLowerCase()}
                </p>
              ) : (
                ""
              )}
              {valeurfoncState[index] ? (
                <p>
                  <strong>Valeur foncière:</strong>
                  <br />
                  {Number(valeurfoncState[index]).toLocaleString("fr-FR")} €
                </p>
              ) : (
                ""
              )}
              {sbatiState[index] ? (
                <p>
                  <strong>Surface :</strong>
                  <br />
                  {sbatiState[index]} m²
                </p>
              ) : (
                ""
              )}
              {sterrState[index] > 0 ? (
                <p>
                  <strong>Surface du terrain:</strong>
                  <br />
                  {sterrState[index]} m²
                </p>
              ) : (
                ""
              )}
              {sbatiState[index] > 0 && valeurfoncState[index] > 0 ? (
                <p>
                  <strong>Prix au m²:</strong>
                  <br />
                  {Number(valeurfoncState[index] / sbatiState[index]).toFixed(
                    0
                  )}{" "}
                  €/m²
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
  sbati: PropTypes.string,
  datemut: PropTypes.string,
  libtypbien: PropTypes.string,
  idmutations: PropTypes.string,
  polygons: PropTypes.string,
  codeInsee: PropTypes.string,
  sterr: PropTypes.string,
  valeurfonc: PropTypes.string,
};

Map.defaultProps = {
  sbati: "",
  datemut: "",
  codeInsee: "31555",
  libtypbien: [],
  idmutations: [],
  polygons: [],
  sterr: [],
  valeurfonc: [],
};
