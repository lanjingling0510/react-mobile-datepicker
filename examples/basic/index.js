import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../../lib/index';
import { nextTime } from '../../lib/time.js';
(function main() {
    const datePicker = (
        <DatePicker
            startDate={nextTime(new Date(), -1)}
            minDate={nextTime(new Date(), -3)}
            onSelect={(time) => { console.log(time); }} />
    );
    ReactDOM.render(datePicker, document.getElementById('react-box'));
}());
