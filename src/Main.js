import { useState, useEffect } from "react";
import { TileLayer } from "react-leaflet/TileLayer";
import { MapContainer } from "react-leaflet";
import { Popup } from "react-leaflet/Popup";
import { Marker } from "react-leaflet/Marker";
import OrderInfo from "../src/OrderInfo";
import IconTruck from "../src/icons/IconTruck";
import IconFinish from "../src/icons/IconFinish";
import Error from "./Error";
import "../src/images/error.gif";


import "./App.css";

function Main() {
  //   //Подмена slug из адресной строки

  // const path = window.location.pathname;
  //   const pathParts = path.split('/');
  //   const desiredPath = pathParts[pathParts.length - 2];

  //   // console.log(desiredPath);

  // //Рефакторинг рабочего варианта работы с АПИшкой
  //   const [clientCoordinates, setClientCoordinates] = useState({
  //     lat: "",
  //     lon: "",
  //   });
  //   const [lastCourierPoint, setLastCourierPoint] = useState({
  //     lat: "",
  //     lon: "",
  //   });

  //   const [orderDetails, setOrderDetails] = useState({
  //     numberOrder: "",
  //     timeDelivery: "",
  //     numberQueue: "",
  //   });

  //   const { numberOrder, timeDelivery, numberQueue } = orderDetails;

  //   const [markers, setMarkers] = useState("");

  //   useEffect(() => {

  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           `http://192.168.104.187:8000/api/v1/client/?slug=${desiredPath}`
  //         );
  //         const data = await response.json();
  //         const dataOrder = data;

  //         setClientCoordinates(dataOrder.client_coordinates);
  //         setLastCourierPoint(dataOrder.last_courier_point);

  //         setMarkers(
  //           dataOrder.past_client_coordinates.map((coords, index) => (
  //             <Marker key={index} position={[coords.lat, coords.lon]} />
  //           ))
  //         );

  //         setOrderDetails({
  //           numberOrder: dataOrder.order_number,
  //           timeDelivery: dataOrder.delivery_datetime,
  //           numberQueue: dataOrder.client_position,
  //         });

  //         // console.log("Data:", dataOrder);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //   //   const intervalId = setInterval(fetchData, 30000);

  //   // return () => clearInterval(intervalId);
  //   }, [desiredPath]);

  //Тестовая локальная фейк апи

  //Подмена slug из адресной строки

  const path = window.location.pathname;
  const pathParts = path.split("/");
  const desiredPath = pathParts[pathParts.length - 2];

  // console.log(desiredPath);

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
  const [delivery, setDelivery] = useState("");
  const [error, setError] = useState(null);
  const [slug, setSlug] = useState('');

  useEffect(() => {
    const data = [
      {
        order_number: "00032980",
        client_position: 1,
        delivery_datetime: "2023-04-14T19:49:33.017476",
        slug: "9PdxHZ6zrf",
        client_coordinates: {
          lat: 43.0956391,
          lon: 131.9037986,
          type: "walking",
        },
        past_client_coordinates: [
          {
            lat: 43.1033002,
            lon: 131.899003,
          },
          {
            lat: 43.1015497,
            lon: 131.9227305,
          },
        ],
        last_courier_point: {
          lat: 43.1015497,
          lon: 131.9227309,
          type: "walking",
        },
      },
    ];
    const fetchData = async () => {
      try {
        const dataOrder = data[0];

        setClientCoordinates(dataOrder.client_coordinates);
        setLastCourierPoint(dataOrder.last_courier_point);

        setMarkers(
          dataOrder.past_client_coordinates.map((coords, index) => (
            <Marker key={index} position={[coords.lat, coords.lon]} />
          ))
        );

        setSlug(dataOrder.slug)

        setOrderDetails({
          numberOrder: dataOrder.order_number,
          timeDelivery: dataOrder.delivery_datetime,
          numberQueue: dataOrder.client_position,
        });

        //Смотрим какая очередь, если будет "0", рендерим отзыв
        setDelivery(dataOrder.client_position);
      } catch (error) {
        console.error("Ошибка Catch:", error);
        setError("Произошла ошибка при загрузке данных.");
        
      }

      // numberOrder === 0 ? console.log(0) : "";
    };
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    console.log("UseEffect:", delivery);
    return () => clearInterval(intervalId);
  }, []);

  console.log(slug)

  return (
    <>
      {error ? (
      <Error/>
      ) : (<>
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
          delivery={delivery}
            numberOrder={numberOrder}
            timeDelivery={timeDelivery}
            numberQueue={numberQueue}
          />
        </>
      )}
       
    </>
  );
}

export default Main;
