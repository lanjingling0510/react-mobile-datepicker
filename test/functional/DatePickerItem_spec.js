
import React from 'react';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
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

describe('DatePickerItem.js测试', () => {
    describe('测试Lifecycle', () => {
        it('应该调用componentWillMount,应该并更新state', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, 'componentWillMount');
            const datePicker = mount(
                <DatePickerItem
                    date={productDate(new Date(2010, 3, 7))}
                    minDate={productDate(new Date(2010, 3, 6))}
                    maxDate={productDate(new Date(2010, 3, 8))}
                    typeName="Date" />
            );
            const dates = datePicker.state('dates');
            sinon.assert.calledOnce(spyFunction);
            expect(dates).to.deep.equals(
                Array(...Array(5)).map((value, index) => {
                    const date = nextDate(new Date(2010, 3, 7), index - 2);
                    return {
                        ...getTime(date, 'Date'),
                        angle: (2 - index) * 22.5,
                    };
                }));
            spyFunction.restore();
        })


        it('应该调用componentWillReceiveProps,并传入this._moveTo正确的参数(多种情况)', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, 'componentWillReceiveProps');
            const spyFunction2 = sinon.spy(DatePickerItem.prototype, '_moveTo');
            const datePicker = mount(
                <DatePickerItem
                    date={productDate(new Date(2010, 3, 7))}
                    minDate={productDate(new Date(2010, 3, 6))}
                    maxDate={productDate(new Date(2010, 3, 8))}
                    typeName="Date" />
            );
            datePicker.setProps({ date: productDate(new Date(2010, 3, 8)) });
            sinon.assert.calledOnce(spyFunction);
            expect(spyFunction2.getCall(0).args[1]).to.equals(datePicker.instance().angle + 22.5);
            spyFunction.restore();
            spyFunction2.restore();
        })
    })

    describe('测试方法:', () => {
        it('_setOpacity应该返回相应的值，当传入不同的临界值', () => {
            const datePicker = mount(
                <DatePickerItem
                    date={productDate(new Date(2010, 3, 7))}
                    minDate={productDate(new Date(2010, 3, 6))}
                    maxDate={productDate(new Date(2010, 3, 8))}
                    typeName="Date" />
             );
             const inst = datePicker.instance();
             const test1 = [0, 1];
             const test2 = [40, 0];
             const test3 = [-40, 0];
             expect(inst._setOpacity(test1[0])).to.equals(test1[1]);
             expect(inst._setOpacity(test2[0])).to.equals(test2[1]);
             expect(inst._setOpacity(test3[0])).to.equals(test3[1]);
        })

        it('_moveToNext应该调用this.props.onSelect, 当可以canMove为true时', () => {
            const spyFunction = sinon.spy();
            const datePicker = mount(
                <DatePickerItem
                    date={productDate(new Date(2010, 3, 7))}
                    minDate={productDate(new Date(2010, 3, 6))}
                    maxDate={productDate(new Date(2010, 3, 8))}
                    typeName="Date"
                    onSelect={spyFunction} />
             );
             const inst = datePicker.instance();
             inst._moveToNext(1);
             sinon.assert.calledOnce(spyFunction);
        })

        it('_moveToNext应该调用this._moveTo, 当可以canMove为false时', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, '_moveTo');
            const datePicker = mount(
                <DatePickerItem
                    date={productDate(new Date(2010, 3, 7))}
                    minDate={productDate(new Date(2010, 3, 6))}
                    maxDate={productDate(new Date(2010, 3, 7))}
                    typeName="Date" />
             );
             const inst = datePicker.instance();
             inst._moveToNext(1);
             sinon.assert.calledOnce(spyFunction);
             spyFunction.restore();
        })
    })

    describe('测试交互事件:', () => {
        it('应该触发handleContent3次, 在触摸屏幕之后', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, 'handleContentTouch');
            const datePicker = mount(
                <DatePickerItem
                    date={productDate(new Date(2010, 3, 7))}
                    minDate={productDate(new Date(2010, 3, 6))}
                    maxDate={productDate(new Date(2010, 3, 8))}
                    typeName="Date" />
            );

            datePicker.find('.datepicker-viewport').simulate('touchStart');
            datePicker.find('.datepicker-viewport').simulate('touchMove');
            datePicker.find('.datepicker-viewport').simulate('touchEnd');
            sinon.assert.callCount(spyFunction, 3);
            spyFunction.restore();
        })
    })

    describe('测试逻辑', () => {
        it('应该向_moveToNext传入正确direction, 当滑动超过touchLen', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, '_moveToNext');
            const datePicker = mount(
                <DatePickerItem
                    date={productDate(new Date(2010, 3, 7))}
                    minDate={productDate(new Date(2010, 3, 6))}
                    maxDate={productDate(new Date(2010, 3, 7))}
                    typeName="Date" />
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
            sinon.assert.calledOnce(spyFunction);
            spyFunction.restore();
        })

        it('应该调用_moveTo, 当向上滑动未超过touchLen', () => {
            const spyFunction = sinon.spy(DatePickerItem.prototype, '_moveTo');
            const datePicker = mount(
                <DatePickerItem
                    date={productDate(new Date(2010, 3, 7))}
                    minDate={productDate(new Date(2010, 3, 6))}
                    maxDate={productDate(new Date(2010, 3, 7))}
                    typeName="Date" />
            );
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 39 }],
            };
            datePicker.find('.datepicker-viewport').simulate('touchStart', touchstartEvent);
            datePicker.find('.datepicker-viewport').simulate('touchEnd', touchendEvent);
            sinon.assert.calledOnce(spyFunction);
            spyFunction.restore();
        })
    })
});
