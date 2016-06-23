import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import '../../lib/index.css';
import DatePicker from '../../lib/index';
import { nextTime } from '../../lib/time.js';
(function main() {
    let isOpen = true;
    const datePicker = (
        <DatePicker
            isOpen={isOpen}
            startDate={nextTime(new Date(), -1)}
            onCancel={() => { isOpen = false; }}
            onSelect={(time) => { console.log(time); }} />
    );
    ReactDOM.render(datePicker, document.getElementById('react-box'));
}());
