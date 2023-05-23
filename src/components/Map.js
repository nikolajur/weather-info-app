import React, { useContext } from "react";
import LocationContext from "../store/location-context";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationGraphics from "./LocationGraphics";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = () => {
  const ctx = useContext(LocationContext);

  return (
    <MapContainer center={[49.7, 15.3]} zoom={5}>
      <TileLayer
        attribution='&copy;&nbsp;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy;&nbsp;<a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        maxZoom={20}
      />
      {ctx.coordinates && (
        <>
          <LocationGraphics />
        </>
      )}
    </MapContainer>
  );
};

export default Map;
