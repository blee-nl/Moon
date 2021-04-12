import React from "react";
import EventCardWrapper from "./EventCardWrapper";

export interface EventProps {
  name: string;
  status: { description: string };
  window_start: string;
  image: string;
  pad: { location: { name: string; latitude: string; longitude: string } };
}

export function EventCard(event: EventProps) {
  return (
    <EventCardWrapper>
      <div className="card">
        <h5 className="title"> {event.name}</h5>
        {event.image && <img src={event.image} />}
        <div> {event.status.description}</div>
        <div>{event.window_start}</div>
        <div> {event.pad.location.name}</div>
      </div>
    </EventCardWrapper>
  );
}

export default EventCard;
