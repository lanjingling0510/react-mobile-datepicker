
import React from 'react';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import DatePicker from '../../lib/DatePicker';
import DatePickerItem from '../../lib/DatePickerItem';
import {getTime, nextDate} from '../../lib/time';
import eventTrigger from '../event_helper.js';

const DEFAULT_PROPS = {
    value: new Date(2016, 8, 16),
    min: new Date(2015, 10, 1),
    max: new Date(2020, 10, 1),
    dateFormat: ['YYYY', 'M', 'D'],
    isOpen: true,
}

function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}

describe('DatePicker.js', () => {

    describe('Lifecycle', () => {
        it ('should update value of state when parent component value of props update', () => {
            const datePicker = mount(
                <DatePicker {...DEFAULT_PROPS} />
            );
            datePicker.setProps({ value: new Date(2016, 8, 15) });
            expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 8, 15).getTime());
        });
    });

    describe('logic', () => {
        var datePicker;
        var yearPicker;
        var monthPicker;
        var dayPicker;

        before(function() {
            datePicker = mount(
                <DatePicker {...DEFAULT_PROPS} />
            );
            yearPicker = datePicker.find(DatePickerItem).first();
            monthPicker = datePicker.find(DatePickerItem).at(1);
            dayPicker = datePicker.find(DatePickerItem).at(2);
        });

        it ('should update correct value of state, when slide to next year, month, date', () => {
            const touchstartEvent = {
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                targetTouches: [{ pageY: -21 }],
            };
            const touchendEvent = {
                changedTouches: [{ pageY: -21 }],
            };

            const year = yearPicker.find('.datepicker-viewport').node;

            eventTrigger(year, 'touchstart',  touchstartEvent);
            eventTrigger(year, 'touchmove', touchmoveEvent);
            eventTrigger(year, 'touchend', touchendEvent);

            return delay(250)
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2017, 8, 16).getTime());

                const month = monthPicker.find('.datepicker-viewport').node;

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2017, 9, 16).getTime());

                const day = dayPicker.find('.datepicker-viewport').node;

                eventTrigger(day, 'touchstart',  touchstartEvent);
                eventTrigger(day, 'touchmove', touchmoveEvent);
                eventTrigger(day, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2017, 9, 17).getTime());
                // Special case
                datePicker.setState({value: new Date(2016, 9, 31)});

                const month = monthPicker.find('.datepicker-viewport').node;

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 10, 30).getTime());

                const day = dayPicker.find('.datepicker-viewport').node;

                eventTrigger(day, 'touchstart',  touchstartEvent);
                eventTrigger(day, 'touchmove', touchmoveEvent);
                eventTrigger(day, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 11, 1).getTime());
            });
        })



        it ('should update correct value of state, when slide to last year, month, date', () => {
            const touchstartEvent = {
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                targetTouches: [{ pageY: 21 }],
            };
            const touchendEvent = {
                changedTouches: [{ pageY: 21 }],
            };

            datePicker.setState({value: new Date(2016, 8, 16)});

            const year = yearPicker.find('.datepicker-viewport').node;

            eventTrigger(year, 'touchstart',  touchstartEvent);
            eventTrigger(year, 'touchmove', touchmoveEvent);
            eventTrigger(year, 'touchend', touchendEvent);

            return delay(250)
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 8, 16).getTime());

                const month = monthPicker.find('.datepicker-viewport').node;

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 7, 16).getTime());

                const day = dayPicker.find('.datepicker-viewport').node;

                eventTrigger(day, 'touchstart',  touchstartEvent);
                eventTrigger(day, 'touchmove', touchmoveEvent);
                eventTrigger(day, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 7, 15).getTime());
                // Special case
                datePicker.setState({value: new Date(2016, 10, 30)});

                const month = monthPicker.find('.datepicker-viewport').node;

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 9, 30).getTime());
            });
        })


        it('should not update value of state, when less than the minimum', () => {
            datePicker.setState({value: new Date(2016, 11, 2)});
            const touchstartEvent = {
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                targetTouches: [{ pageY: 50 }],
            };
            const touchendEvent = {
                changedTouches: [{ pageY: 50 }],
            };


            const year = yearPicker.find('.datepicker-viewport').node;

            eventTrigger(year, 'touchstart',  touchstartEvent);
            eventTrigger(year, 'touchmove', touchmoveEvent);
            eventTrigger(year, 'touchend', touchendEvent);

            return delay(250)
            .then(() => {
                const month = monthPicker.find('.datepicker-viewport').node;

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);
                return delay(250);
            })
            .then(() => {
                const day = dayPicker.find('.datepicker-viewport').node;

                eventTrigger(day, 'touchstart',  touchstartEvent);
                eventTrigger(day, 'touchmove', touchmoveEvent);
                eventTrigger(day, 'touchend', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2015, 10, 1).getTime());
            });
        })

        it('should not update value of state, when more than the maximum', () => {
            datePicker.setState({value: new Date(2019, 9, 31)});
            const touchstartEvent = {
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                targetTouches: [{ pageY: -50 }],
            };
            const touchendEvent = {
                changedTouches: [{ pageY: -50 }],
            };

            const year = yearPicker.find('.datepicker-viewport').node;

            eventTrigger(year, 'touchstart',  touchstartEvent);
            eventTrigger(year, 'touchmove', touchmoveEvent);
            eventTrigger(year, 'touchend', touchendEvent);

            return delay(250)
            .then(() => {
                const month = monthPicker.find('.datepicker-viewport').node;

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);
                return delay(250);
            })
            .then(() => {
                const day = dayPicker.find('.datepicker-viewport').node;

                eventTrigger(day, 'touchstart',  touchstartEvent);
                eventTrigger(day, 'touchmove', touchmoveEvent);
                eventTrigger(day, 'touchend', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2020, 10, 1).getTime());
            });
        })
    });
});
