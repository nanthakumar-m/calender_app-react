import { useState } from "react";

import "./App.css";
import leftArrow from "./assets/arrow-left.svg";
import rightArrow from "./assets/arrow-right.svg";

const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = () => {
    const daysArray = [];
    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ); // this will return the first day of the month
    const lastDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ); // this will return the last day of the month

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i)
      );
    }
    return daysArray;
  };
  daysInMonth();

  // function for handling the month change
  const handleMonthChange = (e) => {
    const newMonth = months.indexOf(e.target.value);
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
  };

  // function for handling the year change
  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedDate(new Date(newYear, selectedDate.getMonth(), 1));
  };

  // function for checking the current date
  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  };

  return (
    <>
      <div className="calendar">
        <div className="header">
          <button
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() - 1
                ),
                1
              )
            }>
            <img src={leftArrow} alt="" />
          </button>
          <select
            value={months[selectedDate.getMonth()]}
            onChange={handleMonthChange}>
            {months.map((month, index) => (
              <option key={index}>{month}</option>
            ))}
          </select>
          <select
            name=""
            id=""
            onChange={handleYearChange}
            value={selectedDate.getFullYear()}>
            {Array.from(
              { length: 10 },
              (_, i) => selectedDate.getFullYear() - 5 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() + 1
                ),
                1
              )
            }>
            <img src={rightArrow} />
          </button>
        </div>
        <div className="daysOfWeek">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="days">
          {daysInMonth().map((day, index) => (
            <div
              key={index}
              className={
                day
                  ? isSameDay(day, new Date())
                    ? "day current"
                    : "day"
                  : "empty"
              }>
              {day ? day.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
