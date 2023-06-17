import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import axios from 'axios';

const CardMap = ({ address }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const streetAddress = address.split(',')[0].trim();

    mapRef.current = L.map('map').setView([42.8746, 74.5698], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapRef.current);

    const geocoder = L.Control.Geocoder.nominatim();
    const control = L.Control.geocoder({
      geocoder: geocoder,
      defaultMarkGeocode: false,
    }).addTo(mapRef.current);

    axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: streetAddress + ', Бишкек',
        format: 'json',
      },
    })
      .then(response => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          if (lat && lon) {
            const coordinates = [lat, lon];
            mapRef.current.flyTo(coordinates, 18);

            if (markerRef.current) {
              markerRef.current.remove();
            }

            markerRef.current = L.marker(coordinates, {
              icon: L.icon({
                iconUrl: '/images/marker-icon-red.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              }),
            }).addTo(mapRef.current);

            control.markGeocode(response.data[0]);
          } else {
            console.error('Invalid coordinates for the specified address.');
            const defaultCoordinates = [42.8746, 74.5698];
            mapRef.current.flyTo(defaultCoordinates, 15);
          }
        } else {
          console.error('Не удалось найти координаты для указанной улицы.');
          const defaultCoordinates = [42.8746, 74.5698];
          mapRef.current.flyTo(defaultCoordinates, 15);
        }
      })
      .catch(error => {
        console.error('Error fetching coordinates:', error);
        const defaultCoordinates = [42.8746, 74.5698];
        mapRef.current.flyTo(defaultCoordinates, 15);
      });

    return () => {
      mapRef.current.remove();
    };
  }, [address]);

  return <div id="map" style={{ width: '100%', height: '400px', marginTop: '50px',zIndex: "1", boxShadow: '20px 20px 20px black', borderRadius: "10px" }}></div>;
};

export default CardMap;