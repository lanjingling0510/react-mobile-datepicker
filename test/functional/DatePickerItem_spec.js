
import React from 'react';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import DatePickerItem from '../../lib/DatePickerItem';
import {getTime, nextDate} from '../../lib/time';


const DEFAULT_PROPS = {
    value: new Date(2010, 3, 7),
    min: new Date(2010, 2, 6),
    max: new Date(2010, 4, 8),
    format: 'M',
    onSelect: () => {},
}

describe('DatePickerItem.js', () => {
    describe('Lifecycle', () => {
        it('should call componentWillMount and initialize dates of state', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, 'componentWillMount');
            const datePicker = mount(
                <DatePickerItem {...DEFAULT_PROPS} typeName="Date" />
            );
            const dates = datePicker.state('dates');
            sinon.assert.calledOnce(spyFunction);
            expect(dates).to.eql(
                Array(...Array(10)).map((value, index) => {
                    return nextDate(DEFAULT_PROPS.value, index - 5);
                }));
            spyFunction.restore();
        })


        it('componentWillReceiveProps', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, 'componentWillReceiveProps');
            const datePicker = mount(
                <DatePickerItem {...DEFAULT_PROPS} typeName="Date" />
            );
            datePicker.setProps({ date: new Date(2010, 3, 10) });
            const dates = datePicker.state('dates');
            const translateY = datePicker.state('translateY');
            const marginTop = datePicker.state('marginTop');

            sinon.assert.calledOnce(spyFunction);
            expect(translateY).to.equal(-40 * 5);
            expect(marginTop).to.equal(0);
            spyFunction.restore();
        })

        it('shouldComponentUpdate', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, 'shouldComponentUpdate');
            const datePicker = mount(
                <DatePickerItem {...DEFAULT_PROPS} typeName="Date" />
            );

            datePicker.setProps({ value: new Date(2010, 3, 10) });
            expect(spyFunction.returned(true)).to.equal(true);
            datePicker.setProps({ value: new Date(2010, 3, 10) });
            expect(spyFunction.returned(false)).to.equal(true);
        })
    })

    describe('event', () => {
        it('should call handleContent three times after touching', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, 'handleContentTouch');
            const datePicker = mount(
                <DatePickerItem {...DEFAULT_PROPS} typeName="Date" />
            );

            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                type: 'touchmove',
                targetTouches: [{ pageY: 20 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 50 }],
            };

            datePicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
            datePicker.find('.datepicker-viewport').simulate('touchMove', touchmoveEvent);
            datePicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
            sinon.assert.callCount(spyFunction, 3);
            spyFunction.restore();
        })
    })

    describe('logic', () => {
        it('should analyzing the right direction', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, '_moveToNext');
            const datePicker = mount(
                <DatePickerItem {...DEFAULT_PROPS} typeName="Date" />
            );
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 50 }],
            };
            datePicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
            datePicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
            expect(spyFunction.getCall(0).args[0]).to.equal(-1);

            const datePicker2 = mount(
                <DatePickerItem {...DEFAULT_PROPS} typeName="Date" />
            );
            const touchstartEvent2 = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent2 = {
                type: 'touchend',
                changedTouches: [{ pageY: -50 }],
            };
            datePicker2.find('.datepicker-viewport').simulate('touchStart', touchstartEvent2);
            datePicker2.find('.datepicker-viewport').simulate('touchEnd', touchendEvent2);
            expect(spyFunction.getCall(1).args[0]).to.equal(1);
            spyFunction.restore();
        })


        it('should update dates of state, When the sliding more than 20', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, '_updateDates');
            const datePicker = mount(
                <DatePickerItem {...DEFAULT_PROPS} typeName="Date" />
            );
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchmove',
                targetTouches: [{ pageY: 21 }],
            };
            datePicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
            datePicker.find('.datepicker-viewport').simulate('touchMove', touchendEvent);
            sinon.assert.calledOnce(spyFunction);
            spyFunction.restore();
        })

        it ('should not exceed the maximum, when the slide to the border', () => {
            const props = {
                value: new Date(2010, 3, 7),
                min: new Date(2010, 2, 6),
                max: new Date(2010, 3, 7),
                suffix: '',
                onSelect: () => {},
            };

            const spyFunction = sinon.spy(DatePickerItem.prototype, '_moveTo');
            const datePicker = mount(
                <DatePickerItem {...props} typeName="Date" />
            );

            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: -21 }],
            };
            datePicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
            datePicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);

            expect(spyFunction.getCall(0).args[1]).to.equal(5);
        })
    })
});
