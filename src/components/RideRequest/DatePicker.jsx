import Flatpickr from 'react-flatpickr';
import React from 'react';
import "flatpickr/dist/themes/dark.css";

export default function DatePicker({ ride, setRide }) {

    return (
        <Flatpickr
            data-enable-time
            value={ride.dateAndTime}
            onChange={(newDate) => {setRide(prev => {
                return {
                    ...prev,
                    dateAndTime: newDate[0]
                }
            })}}
        />
    )
}