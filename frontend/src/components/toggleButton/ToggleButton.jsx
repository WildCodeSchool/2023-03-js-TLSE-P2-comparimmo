import React from "react";
import "./toggleButton.scss";
import PropTypes from "prop-types";

function ToggleButton({ setShowCarte, showCarte }) {
  const handleClick = () => {
    setShowCarte(!showCarte);
  };

  return (
    <div className="toggle">
      <h2>Tableau</h2>
      <div className="toggle-button">
        <label className="toggle-button-switch">
          <input type="checkbox" onClick={handleClick} />
          <span className="toggle-button-slider" />
        </label>
      </div>
      <h2>Carte</h2>
    </div>
  );
}

ToggleButton.propTypes = {
  setShowCarte: PropTypes.func,
  showCarte: PropTypes.node,
};
ToggleButton.defaultProps = {
  setShowCarte: () => {},
  showCarte: false,
};

export default ToggleButton;
