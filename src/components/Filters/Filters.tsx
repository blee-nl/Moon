import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "../SearchInput/SearchInput";
import DatePicker from "../DatePicker/DatePicker";
import DropDown from "../DropDown/DropDown";
import FiltersWrapper from "./FiltersWrapper";

type handleFiltersArg = {
  filterName: string;
  filterValue:
    | string
    | null
    | number
    | { startDate: string | null; endDate: string | null };
};

type FiltersProp = {
  handleFilters: (details: handleFiltersArg) => void;
};
const Filters = ({ handleFilters }: FiltersProp) => {
  const [agencies, setAgencies] = useState([]);
  const [statues, setStatuses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let currentRender = true;

    setLoading(true);
    setErrorMessage("");

    async function loadData() {
      try {
        const AgenciesInfoResponse = await axios.get(
          `https://lldev.thespacedevs.com/2.2.0/agencies/`
        );

        const StatusInfoResponse = await axios.get(
          `https://lldev.thespacedevs.com/2.2.0/config/launchstatus/`
        );

        if (
          (AgenciesInfoResponse.status === 404 ||
            StatusInfoResponse.status === 404) &&
          currentRender
        ) {
          throw new Error(
            `Something went wrong : ${AgenciesInfoResponse.status} `
          );
        }

        if (currentRender) {
          setAgencies(AgenciesInfoResponse.data?.results);
          setStatuses(StatusInfoResponse.data?.results);
          setLoading(false);
          setErrorMessage("");
        }
      } catch (err) {
        if (currentRender) {
          setLoading(false);
          setErrorMessage(err.message);
        }
      }
    }

    loadData();

    return () => {
      currentRender = false;
    };
  }, []);

  return (
    <FiltersWrapper>
      <SearchInput
        handleSearchInput={(searchWord) => {
          handleFilters({
            filterName: "search",
            filterValue: searchWord,
          });
        }}
      />
      <DatePicker
        handleDatePicker={(dates) => {
          handleFilters({
            filterName: "dates",
            filterValue: dates,
          });
        }}
      />
      {!loading && !errorMessage && (
        <DropDown
          items={agencies}
          onSelect={(agencyId) => {
            handleFilters({
              filterName: "launcher_config__id",
              filterValue: agencyId,
            });
          }}
          defaultLabel="select Agency"
        />
      )}
      {!loading && !errorMessage && (
        <DropDown
          items={statues}
          onSelect={(statusId) => {
            handleFilters({
              filterName: "status",
              filterValue: statusId,
            });
          }}
          defaultLabel="select status"
        />
      )}
    </FiltersWrapper>
  );
};

export default Filters;
