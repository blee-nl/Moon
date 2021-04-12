import React from "react";
import GoogleMapReact from "google-map-react";
import MapContainer from "./MapContainer";

const GOOGLE_API_KEY = "";

type MarkerItem = { pad: { latitude: string; longitude: string }; id: string };
type MarkersProps = { markers: Array<MarkerItem> };

// Marker component
const Marker = ({ lat, lng }: any) => {
  if (!lat && !lng) {
    return null;
  }
  const markerStyle = {
    border: "1px solid white",
    borderRadius: "50%",
    height: 10,
    width: 10,
    backgroundColor: "blue",
    cursor: "pointer",
    zIndex: 10,
  };

  return <div style={markerStyle} />;
};

export function GoogleMap({ markers }: MarkersProps) {
  const mapProps = {
    bootstrapURLKeys: {
      key: GOOGLE_API_KEY,
    },
    defaultCenter: {
      lat: 26.29,
      lng: 12.83,
    },
    defaultZoom: 2,
    options: () => ({
      minZoom: 2,
      maxZoom: 12,
      keyboardShortcuts: false,
      draggableCursor: "initial",
      zoomControl: false,
    }),
  };

  return (
    <MapContainer>
      <GoogleMapReact {...mapProps}>
        {markers
          .filter(
            (item: MarkerItem) => item?.pad?.latitude && item?.pad?.longitude
          )
          .map((item: MarkerItem) => (
            <Marker
              lat={item.pad.latitude}
              lng={item.pad.longitude}
              data={item}
              key={item.id}
            />
          ))}
      </GoogleMapReact>
    </MapContainer>
  );
}

export default GoogleMap;
