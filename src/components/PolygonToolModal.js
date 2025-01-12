import React from "react";

const PolygonToolModal = ({ onImport, onClose }) => {
  const handleImport = () => {
    const polygonCoordinates = [
      [1, 2],
      [3, 4],
      [5, 6],
    ]; // Example data
    onImport(polygonCoordinates);
  };

  return (
    <div className="modal">
      <h3>Polygon Tool</h3>
      <button onClick={handleImport}>Import Points</button>
      <button onClick={onClose}>Discard</button>
    </div>
  );
};

export default PolygonToolModal;
