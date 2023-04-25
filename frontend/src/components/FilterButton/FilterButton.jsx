import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./filterButton.scss";

function FilterButton({ text, codeBien }) {
  const [propertyType, setPropertyType] = useState([111, 121, 21]);
  const [isSelected, setIsSelected] = useState(true);
  const handleClick = () => {
    console.info(isSelected);
    setIsSelected(!isSelected);
    console.info(isSelected);
    if (isSelected) {
      setPropertyType(propertyType.push(codeBien));
    } else {
      setPropertyType(propertyType.splice(propertyType.indexOf(codeBien, 1)));
    }
    console.info(codeBien, propertyType, isSelected);
  };

  return (
    <div className={`${style.filterButton}`}>
      {isSelected ? (
        <button type="button" className="buttonSelected" onClick={handleClick}>
          {text}
        </button>
      ) : (
        <button
          type="button"
          className="buttonNotSelected"
          onClick={handleClick}
        >
          {text}
        </button>
      )}
    </div>
  );
}

FilterButton.propTypes = {
  text: PropTypes.string,
  codeBien: PropTypes.number,
};
FilterButton.defaultProps = {
  text: "",
  codeBien: 0,
};

export default FilterButton;
