import React from "react";
import "../assets/styles/index.scss";
import "./About.scss";
// eslint-disable-next-line import/no-unresolved
import minilogo from "@assets/img/minilogo.jpg";
// eslint-disable-next-line import/no-unresolved
import cedric from "../../public/image/cedric.jpg";
// eslint-disable-next-line import/no-unresolved
import mathieu from "../../public/image/matthieu.jpg";
// eslint-disable-next-line import/no-unresolved
import antoine from "../../public/image/antoine.jpg";
// eslint-disable-next-line import/no-unresolved
import hugo from "../../public/image/hugo.jpg";

function About() {
  return (
    <div className="aboutContent">
      <section>
        <div className="aboutComparimmo">
          <div className="d-flex">
            <img className="logoChip" src={minilogo} alt="" />
            <h2 className="titleAPropos">COMPAR'IMMO</h2>
          </div>
          <p>
            Bienvenue sur notre site internet dédié à la comparaison des valeurs
            foncières des maisons et appartements sur les différentes communes
            de France. <br />
            Grâce à notre outil de comparaison, nous facilitons la recherche de
            lieu pour investir dans l’immobilier ou pour prendre connaissance
            des tendances du marché. Vous pouvez sélectionner une commune pour
            afficher ses informations principales, ou en sélectionner plusieurs
            pour comparer les prix moyens au m². <br />
            Via la carte interactive, vous pouvez également séléctionner
            directement une commune et regarder les dernières ventes effectuées
            sur les appartements, maisons ou terrains dans la rue de votre
            choix.
          </p>
        </div>
        <div className="aboutAPi">
          <div className="d-flex">
            <img className="logoChip" src={minilogo} alt="" />
            <h2 className="titleAPropos"> Ressources utilisées </h2>
          </div>
          <p>
            Pour réaliser ce site internet, plusieurs API ont été utilisées pour
            récupérer les données:
          </p>
          <ul>
            <li>
              <a
                href="https://datafoncier.cerema.fr/donnees/autres-donnees-foncieres/dvfplus-open-data"
                target="_blank"
                rel="noopener noreferrer"
              >
                DVF+ open-data par CEREMA
              </a>
            </li>
            <li>
              <a
                href="https://leafletjs.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LEAFLET MAP
              </a>
            </li>
            <li>
              {" "}
              <a
                href="https://api.gouv.fr/documentation/api-geo"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Découpage Administratif - (API Geo)
              </a>
            </li>
          </ul>
        </div>

        <div className="aboutDev">
          <div className="teamDev">
            <img className="logoChip" src={minilogo} alt="Logo Compar'Immo" />
            <h2 className="titleAPropos">L'équipe de développeurs</h2>
            <br />
          </div>
          <div className="trombi">
            <div className="dev">
              <img className="photo" src={hugo} alt="Hugo" />
              <br />
              <h2>Hugo CARNAZZA</h2>
            </div>
            <div className="dev">
              <img className="photo" src={antoine} alt="Antoine" />
              <br />
              <h2>Antoine CASSAGNE</h2>
            </div>
            <div className="dev">
              <img className="photo" src={mathieu} alt="Mathieu" />
              <br />
              <h2>Matthieu GUINET</h2>
            </div>
            <div className="dev">
              <img className="photo" src={cedric} alt="Cédric" />
              <br />
              <h2>Cédric PALACIO-VIDAL</h2>
            </div>
          </div>
          <p>
            Ce site Web a été réalisé dans le cadre du projet 2 de la formation
            “Développeur Web” à la Wild Code School.
          </p>{" "}
        </div>
      </section>
    </div>
  );
}

export default About;
