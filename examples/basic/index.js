import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../../lib/index';

if (process.env.NODE_ENV === 'development') {
    window.Pref = require('react-addons-perf');
}

(function main() {
    const datePicker = (
        <DatePicker
            startDate={new Date()}
            onSelect={(time) => {
                const textNode = document.createTextNode(time);
                document.body.insertBefore(textNode, document.body.firstChild);
            }} />
    );
    ReactDOM.render(datePicker, document.getElementById('react-box'));
}());
