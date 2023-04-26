import React from "react";

function About() {
  return (
    <div className="aboutContent">
      <div className="homeButton">
        <button type="button"> ABOUT US</button>
      </div>
      <section>
        <div className="aboutComparimmo">
          <img src="" alt="" />
          <h2>COMPAR'IMMO</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
            consequuntur doloribus repellat quos, saepe facere quae quisquam
            molestias deserunt non delectus libero exercitationem dolorum hic
            ipsam dolorem enim nihil omnis fugit adipisci, voluptate neque
            sapiente cupiditate est. Necessitatibus, placeat fugiat sapiente
            adipisci provident culpa? Culpa ad tempore eos debitis inventore!
          </p>
        </div>
        <div className="aboutAPi">
          <img src="" alt="" />
          <h2> Ressources utilisées </h2>
          <ul>
            <p>
              Pour réaliser ce site internet, plusieurs sources (notamment pour
              les données) ont été utilisées.
            </p>
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
          </ul>
        </div>

        <div className="aboutDev">
          <img src="" alt="" />
          <h2>L'équipe de dévelppeurs</h2>
          <p>L’équipe de développeur est composée de : </p>
          <div className="dev">
            <img src="" alt="" />
            <h2>Hugo CARNAZZA</h2>
          </div>
          <div className="dev">
            <img src="" alt="" />
            <h2>Antoine CASSAGNE</h2>
          </div>
          <div className="dev">
            <img src="" alt="" />
            <h2>Matthieu GUINET</h2>
          </div>
          <div className="dev">
            <img src="" alt="" />
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
