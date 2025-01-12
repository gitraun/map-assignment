import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import Draw from "ol/interaction/Draw";

const MapComponent = ({ mode, setCoordinates, setMode }) => {
  const mapRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
    }
  }, []);

  useEffect(() => {
    if (mode) {
      const drawInteraction = new Draw({ type: mode });
      map.current.addInteraction(drawInteraction);

      drawInteraction.on("drawend", (event) => {
        const geometry = event.feature.getGeometry();
        const newCoordinates = geometry.getCoordinates();

        // Save coordinates
        setCoordinates((prev) => [...prev, newCoordinates]);
        console.log("Drawing complete:", newCoordinates);

        // Reset mode
        setMode(null);
      });

      return () => {
        map.current.removeInteraction(drawInteraction); // Clean up
      };
    }
  }, [mode, setCoordinates, setMode]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && mode) {
        console.log("Enter key pressed, finishing drawing...");
        const interactions = map.current.getInteractions().getArray();
        const drawInteraction = interactions.find((interaction) => interaction instanceof Draw);
        if (drawInteraction) {
          drawInteraction.finishDrawing(); // End drawing manually
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [mode]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;
