import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import moment from "moment";
import React from "react";
import MapBox from "./MapBox";

export interface Event {
  id: string;
  name: string;
  pad: { latitude: string; longitude: string; name: string };
  window_start: string;
  launch_service_provider?: { name: string };
  location: { name: string };
  status: { name: string };
}

interface Props {
  events: Event[];
}

export function LeafletMap({ events }: Props) {
  // Default coordinates set to Oslo central station
  const position: LatLngExpression = [37.6, -95.665];
  const zoom: number = 3;

  return (
    <MapBox>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {events
          .filter((item: Event) => item?.pad?.latitude && item?.pad?.longitude)
          .map((item: Event) => (
            <div key={item.id}>
              <Marker
                position={[
                  Number(item.pad.latitude),
                  Number(item.pad.longitude),
                ]}
                key={item.id}
              >
                <Popup>
                  <h3> {item.name}</h3>
                  <div className="des">
                    <div>{item.pad?.name}</div>
                    <div>{item.location?.name}</div>
                    <div>{moment(item.window_start).format("LLLL")}</div>
                    <div>{item.launch_service_provider?.name}</div>
                    <div>{item.status?.name}</div>
                  </div>
                </Popup>
              </Marker>
            </div>
          ))}
      </MapContainer>
    </MapBox>
  );
}

export default LeafletMap;
// {(Object.keys(item) as (keyof Event)[]).map(
//     (itemKey) =>
//       typeof item[itemKey] === "object" && (
//         <div className="row">{item[itemKey]?}</div>
//       )
//   )}
