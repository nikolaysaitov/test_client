import { useState, useEffect } from "react";
import { TileLayer } from "react-leaflet/TileLayer";
import { MapContainer } from "react-leaflet";
import { Popup } from "react-leaflet/Popup";
import { Marker } from "react-leaflet/Marker";
import OrderInfo from "../src/OrderInfo";
import IconTruck from "../src/icons/IconTruck";
import IconFinish from "../src/icons/IconFinish";


import "./App.css";

function Main() {
//Рабочий вариант работы с АПИшкой
  // const [clientLat, setClientLat] = useState("");
  // const [clientLon, setClientLon] = useState("");

  // const [lastCourierLat, setLastCourierLat] = useState("");
  // const [lastCourierLon, setLastCourierLon] = useState("");

  // const [markers, setMarkers] = useState("");

  // const [numberOrder, setNumberOrder] = useState("");
  // const [timeDelivery, setTimeDelivery] = useState("");
  // const [numberQueue, setNumberQueue] = useState("");


  // useEffect(() => {
  //   fetch("http://192.168.104.187:8000/api/v1/client/?slug=gDUGOC4C9u")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const dataOrder = data;
  //       setClientLat(dataOrder.client_coordinates.lat);
  //       setClientLon(dataOrder.client_coordinates.lon);

  //       setLastCourierLat(dataOrder.last_courier_point.lat);
  //       setLastCourierLon(dataOrder.last_courier_point.lon);

  //       setMarkers(
  //         dataOrder.past_client_coordinates.map((coords, index) => (
  //           <Marker key={index} position={[coords.lat, coords.lon]} />
  //         ))
  //       );

  //       setNumberOrder(dataOrder.order_number);
  //       setTimeDelivery(dataOrder.delivery_datetime);
  //       setNumberQueue(dataOrder.client_position);

  //       console.log("Data:", dataOrder);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  // const clientCoordinates = [clientLat, clientLon];
  // const lastCourierPoint = [lastCourierLat, lastCourierLon];

  //Подмена slug из адресной строки
  const path = window.location.pathname;
  const pathParts = path.split('/'); 
  const desiredPath = pathParts[pathParts.length - 1]; 
  
  console.log(desiredPath); 

//Рефакторинг рабочего варианта работы с АПИшкой
  const [clientCoordinates, setClientCoordinates] = useState({
    lat: "",
    lon: "",
  });
  const [lastCourierPoint, setLastCourierPoint] = useState({
    lat: "",
    lon: "",
  });

  const [orderDetails, setOrderDetails] = useState({
    numberOrder: "",
    timeDelivery: "",
    numberQueue: "",
  });

  const { numberOrder, timeDelivery, numberQueue } = orderDetails;

  const [markers, setMarkers] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.104.187:8000/api/v1/client/?slug=${desiredPath}`
        );
        const data = await response.json();
        const dataOrder = data;

        setClientCoordinates(dataOrder.client_coordinates);
        setLastCourierPoint(dataOrder.last_courier_point);

        setMarkers(
          dataOrder.past_client_coordinates.map((coords, index) => (
            <Marker key={index} position={[coords.lat, coords.lon]} />
          ))
        );

        setOrderDetails({
          numberOrder: dataOrder.order_number,
          timeDelivery: dataOrder.delivery_datetime,
          numberQueue: dataOrder.client_position,
        });

        console.log("Data:", dataOrder);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [desiredPath]);



  return (
    <>
      <MapContainer
        center={[43.0956391, 131.9037986]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
        <Marker position={lastCourierPoint} icon={IconTruck}>
          <Popup></Popup>
        </Marker>
        <Marker position={clientCoordinates} icon={IconFinish}>
          <Popup></Popup>
        </Marker>
      </MapContainer>
      <OrderInfo
        numberOrder={numberOrder}
        timeDelivery={timeDelivery}
        numberQueue={numberQueue}
      />
    </>
  );
}

export default Main;