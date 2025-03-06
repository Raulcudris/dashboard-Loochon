'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import dynamic from 'next/dynamic';

// Asegurar que `leaflet` se importe solo en el cliente
const L = typeof window !== 'undefined' ? require('leaflet') : null;

interface MapComponentProps {
  coordinates: [number, number];
  setCoordinates: (coords: [number, number]) => void;
  isDraggable?: boolean;
  isFullScreen?: boolean;
}

const MapController: React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coords, map.getZoom(), { animate: true });
  }, [coords, map]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ coordinates, setCoordinates, isDraggable = false, isFullScreen = false }) => {
  const [markerIcon, setMarkerIcon] = useState<L.Icon | null>(null); // ✅ Usamos el tipo correcto

  useEffect(() => {
    if (typeof window !== 'undefined' && L) {
      setMarkerIcon(
        new L.Icon({
          iconUrl: '/assets/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      );
    }
  }, []);

  if (!markerIcon) return null; // Evita errores si Leaflet aún no se ha cargado

  return (
    <MapContainer
      center={coordinates}
      zoom={12}
      style={{ height: isFullScreen ? '95%' : '85%', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapController coords={coordinates} />
      <Marker
        position={coordinates}
        icon={markerIcon}
        draggable={isDraggable}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const position = marker.getLatLng();
            setCoordinates([position.lat, position.lng]);
          },
        }}
      />
    </MapContainer>
  );
};

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });
