import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import styles from "./Map.module.scss";

export default function Map() {
  const [polygons, setPolygons] = useState([]);
  const [libtypbien, setLibtypbien] = useState([]);
  const [valeurfonc, setValeurfonc] = useState([]);
  const [datemut, setDatemut] = useState([]);
  const [sbati, setSbati] = useState([]);
  const [idmutations, setIdmutations] = useState([]);
  const [codeInsee, setCodeInsee] = useState("31555");

  /* changement code insee bouton */
  const handleCodeInseeChange = (event) => {
    setCodeInsee(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    axios
      .get(
        `https://apidf-preprod.cerema.fr/dvf_opendata/geomutations/?code_insee=${codeInsee}&page_size=500&codtypbien=121,111`
      )
      .then((response) => {
        const filteredFeatures = response.data.features.filter(
          (feature) => feature.geometry
        );

        // inversement des coordonées geographiques //
        // eslint-disable-next-line no-shadow
        const polygons = filteredFeatures.map((feature) => {
          const flatArray = feature.geometry.coordinates.flat();
          flatArray.forEach((a) => a.forEach((b) => b.reverse()));
          return flatArray;
        });

        const { features } = response.data;

        setPolygons(polygons);
        setLibtypbien(features.map((feature) => feature.properties.libtypbien));
        setValeurfonc(features.map((feature) => feature.properties.valeurfonc));
        setDatemut(features.map((feature) => feature.properties.datemut));
        setSbati(features.map((feature) => feature.properties.sbati));
        setIdmutations(
          features.map((feature) => feature.properties.idmutation)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [codeInsee]);

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
        <button type="submit">Changer</button>
      </form>
      {/* contenu de la carte */}
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
        {/* affichage du contenu des objets sur la carte  */}
        {polygons.map((polygon, index) => (
          <Polygon key={idmutations[index]} positions={polygon}>
            <Popup>
              {datemut[index] ? (
                <p>
                  <strong>Date de mutation:</strong>
                  <br />
                  {new Date(datemut[index]).toLocaleDateString("fr-FR")}
                </p>
              ) : (
                ""
              )}
              {libtypbien[index] ? (
                <p>
                  <strong>Type de bien:</strong>
                  <br />
                  {libtypbien[index].toLocaleLowerCase()}
                </p>
              ) : (
                ""
              )}
              {valeurfonc[index] ? (
                <p>
                  <strong>Valeur foncière:</strong>
                  <br />
                  {Number(valeurfonc[index]).toLocaleString("fr-FR")} €
                </p>
              ) : (
                ""
              )}
              {sbati[index] ? (
                <p>
                  <strong>Surface du bâti:</strong>
                  <br />
                  {sbati[index]} m²
                </p>
              ) : (
                ""
              )}
              {sbati[index] > 0 && valeurfonc[index] > 0 ? (
                <p>
                  <strong>Prix au m²:</strong>
                  <br />
                  {Number(valeurfonc[index] / sbati[index]).toFixed(0)} €/m²
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
