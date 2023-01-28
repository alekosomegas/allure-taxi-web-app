import Flatpickr from 'react-flatpickr';
import React from 'react';
import "flatpickr/dist/themes/dark.css";

export default function DatePicker({ date, setDate }) {

    return (
        <Flatpickr
            data-enable-time
            value={date}
            onChange={(date) => {setDate(date)}}
        />
    )
}