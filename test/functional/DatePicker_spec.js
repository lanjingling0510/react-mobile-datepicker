
import React from 'react';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import DatePicker from '../../lib/DatePicker';
import DatePickerItem from '../../lib/DatePickerItem';
import {getTime, nextDate} from '../../lib/time';

function productDate(date) {
    const nDate = nextDate(date, 0);
    return {
        value: nDate,
        timestamp: nDate.getTime(),
        Year: getTime(nDate, 'Year'),
        Month: getTime(nDate, 'Month'),
        Date: getTime(nDate, 'Date'),
    };
}

describe('时间选择器组件DatePicker', () => {
    describe('测试逻辑', () => {
        var datePicker;
        var yearPicker;
        var monthPicker;
        var dayPicker;

        before(function() {
            datePicker = mount(
                <DatePicker
                    touchLen={40}
                    dateColor={'#fff'}
                    btnColor={'#fff'}
                    layerBackground={'#ffa70b'}
                    date={new Date()}
                    minDate={new Date(1970, 0, 1)}
                    maxDate={new Date(2050, 0, 1)}
                    onSelect={() => {}}
                    date={new Date(2010, 2, 7)}/>
            );
            yearPicker = datePicker.find(DatePickerItem).first();
            monthPicker = datePicker.find(DatePickerItem).at(1);
            dayPicker = datePicker.find(DatePickerItem).at(2);
        });

        it ('state.date应该更新, 当滑动到下一个年份', () => {
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: -50 }],
            };

            yearPicker.simulate('touchStart', touchstartEvent);
            yearPicker.simulate('touchEnd', touchendEvent);
            yearPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2011, 2, 7).getTime());
        })

        it ('state.date应该更新, 当滑动到下一个月份', () => {
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: -50 }],
            };
            monthPicker.simulate('touchStart', touchstartEvent);
            monthPicker.simulate('touchEnd', touchendEvent);
            monthPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2011, 3, 7).getTime());
        })

        it ('state.date应该更新, 当滑动到下一个日期', () => {
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: -50 }],
            };
            dayPicker.simulate('touchStart', touchstartEvent);
            dayPicker.simulate('touchEnd', touchendEvent);
            dayPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2011, 3, 8).getTime());
        })

        it ('state.date应该更新, 当滑动到上一个年份', () => {
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 50 }],
            };

            yearPicker.simulate('touchStart', touchstartEvent);
            yearPicker.simulate('touchEnd', touchendEvent);
            yearPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2010, 3, 8).getTime());
        })

        it ('state.date应该更新, 当滑动到上一个月份', () => {
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 50 }],
            };
            monthPicker.simulate('touchStart', touchstartEvent);
            monthPicker.simulate('touchEnd', touchendEvent);
            monthPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2010, 2, 8).getTime());
        })

        it ('state.date应该更新, 当滑动到上一个日期', () => {
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 50 }],
            };
            dayPicker.simulate('touchStart', touchstartEvent);
            dayPicker.simulate('touchEnd', touchendEvent);
            dayPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2010, 2, 7).getTime());
        })

        it('state.date应该不变, 当滑动超过touchLen但上一个日期小于minDate', () => {
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 50 }],
            };

            datePicker.setProps({ minDate: new Date(2010, 2, 7) });
            yearPicker.simulate('touchStart', touchstartEvent);
            yearPicker.simulate('touchEnd', touchendEvent);
            yearPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2010, 2, 7).getTime());
            monthPicker.simulate('touchStart', touchstartEvent);
            monthPicker.simulate('touchEnd', touchendEvent);
            monthPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2010, 2, 7).getTime());
            dayPicker.simulate('touchStart', touchstartEvent);
            dayPicker.simulate('touchEnd', touchendEvent);
            dayPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2010, 2, 7).getTime());
        })

        it('state.date应该不变, 当滑动超过touchLen但上一个日期大于maxDate', () => {
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: -50 }],
            };

            datePicker.setProps({ maxDate: new Date(2010, 2, 7) });
            yearPicker.simulate('touchStart', touchstartEvent);
            yearPicker.simulate('touchEnd', touchendEvent);
            yearPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2010, 2, 7).getTime());
            monthPicker.simulate('touchStart', touchstartEvent);
            monthPicker.simulate('touchEnd', touchendEvent);
            monthPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2010, 2, 7).getTime());
            dayPicker.simulate('touchStart', touchstartEvent);
            dayPicker.simulate('touchEnd', touchendEvent);
            dayPicker.simulate('transitionEnd', touchendEvent);
            expect(datePicker.state('date').value.getTime()).to.equals(new Date(2010, 2, 7).getTime());
        })

    });
});
