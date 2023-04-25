import React from "react";
import FilterButton from "../components/FilterButton/FilterButton";

function Home() {
  return (
    <div>
      <FilterButton text="Appartement" codeBien={121} />
      <FilterButton text="Maison" codeBien={111} />
      <FilterButton text="Terrain à construire" codeBien={21} />
    </div>
  );
}

export default Home;
