import React, { useState } from "react";
import Dropdown from "./Dropdown";

const MissionModal = ({ coordinates, onClose, onInsertPolygon }) => {
  const [dropdownVisible, setDropdownVisible] = useState(null);

  return (
    <div className="modal">
      <h3>Mission Creation</h3>
      <table>
        <thead>
          <tr>
            <th>WP</th>
            <th>Coordinates</th>
            <th>Distance (m)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coordinates.map((coord, index) => (
            <tr key={index}>
              <td>{`WP(${index.toString().padStart(2, "0")})`}</td>
              <td>{`${coord[0]}, ${coord[1]}`}</td>
              <td>{index > 0 ? "Calculate Distance" : "--"}</td>
              <td>
                <button
                  onClick={() => setDropdownVisible(dropdownVisible === index ? null : index)}
                >
                  ...
                </button>
                {dropdownVisible === index && (
                  <Dropdown
                    onInsertBefore={() => onInsertPolygon(index, "before")}
                    onInsertAfter={() => onInsertPolygon(index, "after")}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MissionModal;
