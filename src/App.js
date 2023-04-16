import { TileLayer } from "react-leaflet/TileLayer";
import { MapContainer } from "react-leaflet";
import { Popup } from "react-leaflet/Popup";
import { Marker } from "react-leaflet/Marker";
import OrderInfo from "../src/OrderInfo";

import { data } from "./dataMap";

import "./App.css";

function App() {
  const position1 = [43.12946813445861, 131.91973799704812];
  const position2 = [43.117324713258924, 131.90667297796918];
  const position3 = [
    data[0].past_client_coordinates[0].lat,
    data[0].past_client_coordinates[0].lon,
  ];

  return (
    <>
      <MapContainer
        center={[43.10845774857224, 131.94015208935897]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position1}>
          <Popup>Владивосток, ул Гульбиновича, д 8 к 2, кв 5</Popup>
        </Marker>
        <Marker position={position2}>
          <Popup>Владивосток, ул Калинина, д 149, кв 3</Popup>
        </Marker>
        <Marker position={position3}>
          <Popup>Владивосток, ул Борисенко, д 76, кв 7</Popup>
        </Marker>
      </MapContainer>
      <OrderInfo />
    </>
  );
}

export default App;
