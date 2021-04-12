import React, { useState } from "react";
import moment, { Moment } from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import DatePickerWrapper from "./DatePickerWrapper";

type Dates = {
  startDate: string | null;
  endDate: string | null;
};

type DatePickerProp = {
  handleDatePicker: (details: Dates) => void;
};

const DatePicker = ({ handleDatePicker }: DatePickerProp) => {
  const [startDate, setStartDate] = useState(moment().format());
  const [endDate, setEndDate] = useState(moment().add(3, "month").format());
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <DatePickerWrapper>
      <DateRangePicker
        startDate={moment(startDate)}
        endDate={moment(endDate)}
        onDatesChange={(dates: {
          startDate: string | null | Moment;
          endDate: string | null | Moment;
        }) => {
          if (dates.startDate) {
            setStartDate(moment(dates.startDate).format());
          }
          if (dates.endDate) {
            setEndDate(moment(dates.endDate).format());
          }
        }}
        focusedInput={focusedInput}
        maxDate={moment().add(4, "month")}
        minDate={moment().add(-100, "month")}
        onFocusChange={(e: any) => setFocusedInput(e)}
        initialVisibleMonth={() => moment()}
        displayFormat="DD/MM/YYYY"
        startDateId="start_date_id"
        endDateId="end_date_id"
        isOutsideRange={() => false}
      />
      <button
        type="submit"
        onClick={() => handleDatePicker({ startDate, endDate })}
      >
        Date Submit
      </button>
    </DatePickerWrapper>
  );
};

export default DatePicker;
