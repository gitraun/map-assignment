import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import MissionModal from "./components/MissionModal";
import PolygonToolModal from "./components/PolygonToolModal";

function App() {
  const [mode, setMode] = useState(null); // Current drawing mode (LineString/Polygon)
  const [coordinates, setCoordinates] = useState([]); // Stores all coordinates for LineString
  const [showMissionModal, setShowMissionModal] = useState(false); // Toggle Mission Modal
  const [showPolygonModal, setShowPolygonModal] = useState(false); // Toggle Polygon Modal
  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState(null); // Index for polygon insertion

  // Handle inserting a polygon
  const handleInsertPolygon = (index, position) => {
    setSelectedWaypointIndex({ index, position });
    setMode("Polygon"); // Switch to Polygon drawing mode
    setShowPolygonModal(true);
  };

  // Import polygon data into the linestring
  const handleImportPolygon = (polygonCoordinates) => {
    if (selectedWaypointIndex) {
      const { index, position } = selectedWaypointIndex;
      const updatedCoordinates = [...coordinates];
      if (position === "before") {
        updatedCoordinates.splice(index, 0, ...polygonCoordinates);
      } else if (position === "after") {
        updatedCoordinates.splice(index + 1, 0, ...polygonCoordinates);
      }
      setCoordinates(updatedCoordinates);
    }
    setShowPolygonModal(false);
    setMode(null); // Reset drawing mode
  };

  return (
    <div>
      <button onClick={() => setMode("LineString")}>Start Drawing</button>
      <button onClick={() => setShowMissionModal(true)}>Mission Planner</button>

      <MapComponent mode={mode} setCoordinates={setCoordinates} setMode={setMode} />

      {showMissionModal && (
        <MissionModal
          coordinates={coordinates}
          onClose={() => setShowMissionModal(false)}
          onInsertPolygon={handleInsertPolygon}
        />
      )}

      {showPolygonModal && (
        <PolygonToolModal
          onImport={handleImportPolygon}
          onClose={() => setShowPolygonModal(false)}
        />
      )}
    </div>
  );
}

export default App;
