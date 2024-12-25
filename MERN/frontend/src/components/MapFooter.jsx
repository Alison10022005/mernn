import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';  // Necesario para modificar la imagen del marcador

const MapFooter = () => {
  // Coordenadas de Bogotá
  const location = [4.7110, -74.0721];

  useEffect(() => {
    // Reemplazar las imágenes de los marcadores con una ruta pública
    const defaultIcon = new L.Icon({
      iconUrl: '/images/marker-icon.png', // Asegúrate de colocar las imágenes en public/images
      shadowUrl: '/images/marker-shadow.png',
    });

    // Establecer el icono por defecto de los marcadores
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  return (
    <footer style={{ width: '100%', height: '300px' }}>
      <MapContainer center={location} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
          <Popup>
            Bogotá, Colombia.
          </Popup>
        </Marker>
      </MapContainer>
    </footer>
  );
};

export default MapFooter;
