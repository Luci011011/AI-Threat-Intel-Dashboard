import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { AttackLocation } from '../types';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface AttackMapProps {
  locations: AttackLocation[];
}

const AttackMap: React.FC<AttackMapProps> = ({ locations }) => {
  const getColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff006e';
      case 'high': return '#ff6b35';
      case 'medium': return '#ffd23f';
      case 'low': return '#00d4ff';
      default: return '#00d4ff';
    }
  };

  const getRadius = (count: number) => {
    return Math.min(count * 2, 30);
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-cyber-gray-light">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        className="bg-cyber-gray"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <CircleMarker
            key={location.id}
            center={[location.lat, location.lng]}
            radius={getRadius(location.count)}
            pathOptions={{
              color: getColor(location.severity),
              fillColor: getColor(location.severity),
              fillOpacity: 0.6,
            }}
          >
            <Popup>
              <div className="text-black">
                <div className="font-bold">{location.type.toUpperCase()}</div>
                <div>Severity: {location.severity}</div>
                <div>Count: {location.count}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AttackMap;

