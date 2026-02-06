"use client";

import { useEffect, useState } from "react";

export default function MapLeaflet() {
  const [Map, setMap] = useState<JSX.Element | null>(null);

  useEffect(() => {
    // Dynamically import Leaflet ONLY in browser
    Promise.all([
      import("react-leaflet"),
      import("react-leaflet-draw"),
    ]).then(([leaflet, draw]) => {
      const { MapContainer, TileLayer, FeatureGroup } = leaflet;
      const { EditControl } = draw;

      setMap(
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FeatureGroup>
            <EditControl
              position="topright"
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
              }}
            />
          </FeatureGroup>
        </MapContainer>
      );
    });
  }, []);

  return Map ?? <p>Loading map...</p>;
}
