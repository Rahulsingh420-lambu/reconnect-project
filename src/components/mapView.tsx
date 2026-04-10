import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import * as L from "leaflet";

// ✅ FIX marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Person {
  _id: string;
  name: string;
  image?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

interface Props {
  data: Person[];
}

const MapView = ({ data }: Props) => {
  const center: [number, number] = [20.5937, 78.9629];

  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  // 📍 GET USER LOCATION (LIVE)
  useEffect(() => {
    navigator.geolocation.watchPosition((pos) => {
      setUserPos([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  // 📏 DISTANCE CALC (Haversine)
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  // 🔥 FIND NEAREST
  let nearestId: string | null = null;

  if (userPos) {
    let min = Infinity;

    data.forEach((item) => {
      if (item.location) {
        const d = getDistance(
          userPos[0],
          userPos[1],
          item.location.lat,
          item.location.lng
        );

        if (d < min) {
          min = d;
          nearestId = item._id;
        }
      }
    });
  }

  return (
    <MapContainer center={center} zoom={5} style={{ height: "350px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 👤 USER LOCATION */}
      {userPos && (
        <>
          <Marker position={userPos}>
            <Popup>You are here 📍</Popup>
          </Marker>

          {/* circle animation */}
          <Circle
            center={userPos}
            radius={500}
            pathOptions={{ color: "blue", fillOpacity: 0.2 }}
          />
        </>
      )}

      {/* 📍 CASE MARKERS */}
      {data.map((item) => {
        if (!item.location) return null;

        const isNearest = item._id === nearestId;

        return (
          <Marker
            key={item._id}
            position={[item.location.lat, item.location.lng]}
          >
            <Popup>
              <div style={{ width: "200px" }}>
                {/* 🖼 IMAGE */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  />
                )}

                {/* 📄 DETAILS */}
                <h4 style={{ margin: "5px 0" }}>{item.name}</h4>

                {isNearest && (
                  <p style={{ color: "lime", fontWeight: "bold" }}>
                    🔥 Nearest Case
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapView;