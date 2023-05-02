import React from "react";
// eslint-disable-next-line import/no-unresolved
import Carousel from "@components/Carousel/Carousel";
import ArrayDataCities from "@components/ArrayDataCities/ArrayDataCities";

function Home() {
  return (
    <>
      <div>
        <Carousel />{" "}
      </div>
      <div>
        <ArrayDataCities />
      </div>
    </>
  );
}

export default Home;
