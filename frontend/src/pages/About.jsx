import React from "react";
import "../assets/styles/index.scss";
import "./About.scss";
// eslint-disable-next-line import/no-unresolved
import minilogo from "@assets/img/minilogo.jpg";
// eslint-disable-next-line import/no-unresolved
import cedric from "@assets/img/cedric.jpg";
// eslint-disable-next-line import/no-unresolved
import mathieu from "@assets/img/mathieu.jpg";

function About() {
  return (
    <div className="aboutContent">
      <div className="homeButton">
        <button type="button"> ABOUT US</button>
      </div>
      <section>
        <div className="aboutComparimmo">
          <div className="d-flex">
            <img src={minilogo} alt="" />
            <h2>COMPAR'IMMO</h2>
          </div>
          <p>
            Bienvenue sur notre site internet dédié à la comparaison des valeurs
            foncières des maisons et appartements sur les différentes communes
            de France. Grâce à notre outil de comparaison, vous pouvez
            facilement trouver le prix au mètre carré dans différentes villes et
            communes, ainsi que localiser les ventes de biens immobiliers grâce
            à notre carte interactive. Notre objectif est de vous fournir les
            informations les plus précises et utiles pour vous aider à prendre
            des décisions éclairées en matière d'achat ou de vente de biens
            immobiliers en France.
          </p>
        </div>
        <div className="aboutAPi">
          <div className="d-flex">
            <img src={minilogo} alt="" />
            <h2> Ressources utilisées </h2>
          </div>
          <p>
            Pour réaliser ce site internet, plusieurs sources (notamment pour
            les données) ont été utilisées.
          </p>
          <ul>
            <li>
              <a href="https://datafoncier.cerema.fr/donnees/autres-donnees-foncieres/dvfplus-open-data">
                DVF+ open-data par (CEREMA)
              </a>
            </li>
            <li>
              <a href="https://leafletjs.com/">LEAFLET MAP</a>
            </li>
            <li>
              {" "}
              <a href="https://api.gouv.fr/documentation/api-geo">
                API Découpage Administratif - (API Geo)
              </a>
            </li>
          </ul>
        </div>

        <div className="aboutDev">
          <div className="teamDev">
            <img src={minilogo} alt="Logo Compar'Immo" />
            <h2>L'équipe de développeurs</h2>
          </div>
          <p>L’équipe de développeur est composée de : </p>
          <div className="dev">
            <img src="" alt="Hugo" />
            <h2>Hugo CARNAZZA</h2>
          </div>
          <div className="dev">
            <img src="" alt="Antoine" />
            <h2>Antoine CASSAGNE</h2>
          </div>
          <div className="dev">
            <img src={mathieu} alt="Mathieu" />
            <h2>Matthieu GUINET</h2>
          </div>
          <div className="dev">
            <img src={cedric} alt="Cédric" />
            <h2>Cédric PALACIO-VIDAL</h2>
          </div>
        </div>
        <p>
          Ce site Web a été réalisé dans le cadre du projet 2 de la formation
          “Développeur Web” à la Wild Code School.
        </p>
      </section>
    </div>
  );
}

export default About;
