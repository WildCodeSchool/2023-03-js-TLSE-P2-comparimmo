import React from "react";
// eslint-disable-next-line import/no-unresolved
import Carousel from "@components/Carousel/Carousel";
import FilterButton from "../components/FilterButton/FilterButton";

function Home() {
  return (
    <div>
      <section>
        <Carousel />
      </section>
      <div>
        <FilterButton text="Appartement" codeBien={121} />
        <FilterButton text="Maison" codeBien={111} />
        <FilterButton text="Terrain à construire" codeBien={21} />
      </div>
    </div>
  );
}

export default Home;
