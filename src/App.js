import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import MissionModal from "./components/MissionModal";
import PolygonToolModal from "./components/PolygonToolModal";
import "./App.css";

function App() {
  const [mode, setMode] = useState(null); // Current drawing mode (LineString/Polygon)
  const [coordinates, setCoordinates] = useState([]); // Stores all coordinates for LineString
  const [showMissionModal, setShowMissionModal] = useState(false); // Toggle Mission Modal
  const [showPolygonModal, setShowPolygonModal] = useState(false); // Toggle Polygon Modal
  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState(null); // Index for polygon insertion

  // Handle starting the drawing process
  const startDrawing = () => {
    setMode("LineString");
    setShowMissionModal(true); // Show Mission Modal when drawing starts
  };

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
    <div className="App">
      <div className="App-header">
        <button onClick={startDrawing}>Start Drawing</button>
        <button onClick={() => setShowMissionModal(true)}>Mission Planner</button>
      </div>

      <MapComponent mode={mode} setCoordinates={setCoordinates} setMode={setMode} />

      {/* Mission Modal */}
      {showMissionModal && (
        <MissionModal
          coordinates={coordinates}
          onClose={() => {
            setShowMissionModal(false);
            setMode(null); // Stop drawing mode when modal closes
          }}
          onInsertPolygon={handleInsertPolygon}
        />
      )}

      {/* Polygon Tool Modal */}
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
