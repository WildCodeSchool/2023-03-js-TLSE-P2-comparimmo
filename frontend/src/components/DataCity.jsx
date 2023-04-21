import PropTypes from "prop-types";

function DataCity({ idbien, sbati, valeurfonc }) {
  const surfHouse = parseInt(`${sbati}`, 10);
  const valeurF = parseInt(`${valeurfonc}`, 10);
  const moyHouse = valeurF / surfHouse;

  return (
    <div>
      <h3>Identifiant du bien : {idbien}</h3>
      <p>
        surface du bien : {surfHouse} <br />
        valeur foncière : {valeurF} <br />
        Prix au m² : {moyHouse} <br />
      </p>
    </div>
  );
}

DataCity.propTypes = {
  idbien: PropTypes.string,
  sbati: PropTypes.string,
  valeurfonc: PropTypes.string,
};

DataCity.defaultProps = {
  idbien: "",
  sbati: "",
  valeurfonc: "",
};

export default DataCity;
