import L from 'leaflet';

import marker from './truck.png';
const IconTruck = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [45,45],     
});

export { IconTruck };