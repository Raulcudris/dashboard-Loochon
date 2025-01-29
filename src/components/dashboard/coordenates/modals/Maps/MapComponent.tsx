import React from 'react';
import { Box } from '@mui/material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

// CSS de Leaflet
import 'leaflet/dist/leaflet.css';

// Ícono personalizado para el marcador
const customMarkerIcon = new L.Icon({
  iconUrl: '/assets/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapComponentProps {
  center: [number, number]; // Coordenadas iniciales
  zoom?: number; // Nivel de zoom
  isDraggable?: boolean; // Permite arrastrar el marcador
  style?: React.CSSProperties; // Estilos personalizados
  onMarkerDrag?: (lat: number, lng: number) => void; // Callback para manejar eventos de arrastre
}

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom = 12,
  isDraggable = false,
  style = { height: '85%', width: '100%' },
  onMarkerDrag,
}) => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <MapContainer center={center} zoom={zoom} style={style}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={center}
          icon={customMarkerIcon}
          draggable={isDraggable}
          eventHandlers={{
            dragend: (e) => {
              if (onMarkerDrag) {
                const marker = e.target;
                const position = marker.getLatLng();
                onMarkerDrag(position.lat, position.lng);
              }
            },
          }}
        />
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
