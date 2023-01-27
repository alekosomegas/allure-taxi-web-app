import Flatpickr from 'react-flatpickr';
import React from 'react';
import "flatpickr/dist/themes/dark.css";

export default function DatePicker() {

    const [date, setDate] = React.useState(new Date());

    return (
        <Flatpickr
            data-enable-time
            value={date}
            // onChange={(date) => {setDate(date)}}
        />
    )
}