import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./filterButton.scss";

function FilterButton({
  text,
  codeBien,
  selected,
  propertyType,
  setPropertyType,
}) {
  const [isSelected, setIsSelected] = useState(selected);

  // updateFilter with the setter on propertyType if the button is selected or unselected
  const updateFilter = (selection) => {
    if (selection) {
      propertyType.splice(propertyType.indexOf(codeBien), 1);
      setPropertyType([...propertyType]);
    } else {
      propertyType.push(codeBien);
      setPropertyType([...propertyType]);
    }
  };

  // change the selection state of the filter button and call the updateFilter function to upadte the property type array
  const handleClick = () => {
    setIsSelected(!isSelected);
    updateFilter(isSelected);
  };

  return (
    <div className={`${style.filterButton}`}>
      <button
        type="button"
        className={
          isSelected
            ? "filterButtons buttonSelected"
            : "filterButtons buttonNotSelected"
        }
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  );
}

FilterButton.propTypes = {
  text: PropTypes.string,
  codeBien: PropTypes.number,
  selected: PropTypes.bool,
  propertyType: PropTypes.arrayOf(PropTypes.number),
  setPropertyType: PropTypes.func,
};
FilterButton.defaultProps = {
  text: "",
  codeBien: 0,
  selected: true,
  propertyType: [],
  setPropertyType: () => {},
};

export default FilterButton;
