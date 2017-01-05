
import React from 'react';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import DatePicker from '../../lib/DatePicker';
import DatePickerItem from '../../lib/DatePickerItem';
import {getTime, nextDate} from '../../lib/time';

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
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                type: 'touchmove',
                targetTouches: [{ pageY: -21 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: -21 }],
            };

            yearPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
            yearPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
            yearPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
            return delay(250)
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2017, 8, 16).getTime());
                monthPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2017, 9, 16).getTime());
                dayPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
                dayPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
                dayPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2017, 9, 17).getTime());
                // Special case
                datePicker.setState({value: new Date(2016, 9, 31)});
                monthPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 10, 30).getTime());
                dayPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
                dayPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
                dayPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 11, 1).getTime());
            });
        })



        it ('should update correct value of state, when slide to last year, month, date', () => {
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                type: 'touchmove',
                targetTouches: [{ pageY: 21 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 21 }],
            };

            datePicker.setState({value: new Date(2016, 8, 16)});

            yearPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
            yearPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
            yearPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
            return delay(250)
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 8, 16).getTime());
                monthPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 7, 16).getTime());
                dayPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
                dayPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
                dayPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 7, 15).getTime());
                // Special case
                datePicker.setState({value: new Date(2016, 10, 30)});
                monthPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 9, 30).getTime());
            });
        })


        it('should not update value of state, when less than the minimum', () => {
            datePicker.setState({value: new Date(2016, 11, 2)});
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                type: 'touchmove',
                targetTouches: [{ pageY: 50 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 50 }],
            };


            yearPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
            yearPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
            yearPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);


            return delay(250)
            .then(() => {
                monthPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
                return delay(250);
            })
            .then(() => {
                dayPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
                dayPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
                dayPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2015, 10, 1).getTime());
            });
        })

        it('should not update value of state, when more than the maximum', () => {
            datePicker.setState({value: new Date(2019, 9, 31)});
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                type: 'touchmove',
                targetTouches: [{ pageY: -50 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: -50 }],
            };


            yearPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
            yearPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
            yearPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);


            return delay(250)
            .then(() => {
                monthPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
                monthPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
                return delay(250);
            })
            .then(() => {
                dayPicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
                dayPicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
                dayPicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2020, 10, 1).getTime());
            });
        })
    });
});
