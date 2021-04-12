import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
// import EventCard from "../../components/EventCard/EventCard";
import LeafletMap from "../../components/LeafletMap/LeafletMap";
import Filters from "../../components/Filters/Filters";
import EventsWrapper from "./EventsWrapper";

export function Events() {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const defaultFilter = {
    search: "",
    launcher_config__id: null,
  };

  const [filters, setFilters] = useState(defaultFilter);

  const handleFilters = useCallback(({ filterName, filterValue }) => {
    if (filterName === "dates") {
      setFilters((prevState) => ({
        ...prevState,
        window_start: filterValue.startDate,
        window_end: filterValue.endDate,
      }));
      return;
    }
    setFilters((prevState) => ({
      ...prevState,
      [filterName]: filterValue,
    }));
  }, []);

  useEffect(() => {
    let currentRender = true;

    setLoading(true);
    setErrorMessage("");

    async function loadData() {
      try {
        const response = await axios.get(
          `https://lldev.thespacedevs.com/2.2.0/launch/`,
          { params: filters }
        );

        if (response.status === 404 && currentRender) {
          throw new Error(`Something went wrong : ${response.status} `);
        }

        if (currentRender) {
          setEvents(response.data?.results);
          setLoading(false);
          setErrorMessage("");
        }
      } catch (err) {
        if (currentRender) {
          console.log("error message: ", err.message);
          setLoading(false);
          setErrorMessage(err.message);
        }
      }
    }

    loadData();

    return () => {
      currentRender = false;
    };
  }, [filters]);

  return (
    <EventsWrapper>
      <Filters handleFilters={handleFilters} />
      {!loading && <LeafletMap events={events} />}
      {loading && <>loading</>}
      {errorMessage}
    </EventsWrapper>
  );
}

export default Events;
