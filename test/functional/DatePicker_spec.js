
import React from 'react';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import DatePicker from '../../lib/DatePicker';
import {nextTime} from '../../lib/time';

describe('时间选择器组件DatePicker', () => {
    describe('测试初始化的过程:', () => {
        it('测试传入_setOpacity的参数', () => {
            const spyFunction = sinon.spy(DatePicker.prototype, '_setOpacity');
            const datePicker = mount(
                <DatePicker />
            );

            const list = [
                spyFunction.getCall(0).args[0],
                spyFunction.getCall(1).args[0],
                spyFunction.getCall(2).args[0],
                spyFunction.getCall(3).args[0],
                spyFunction.getCall(4).args[0],
            ];

            const expectList = [45, 22.5, 0, -22.5, -45];
            expect(list).to.deep.equals(expectList);
            spyFunction.restore();
        })
    })


    describe('测试方法:', () => {
        it('_setOpacity应该返回相应的值，当传入不同的临界值', () => {
            const datePicker = mount(
                <DatePicker />
            );
            const inst = datePicker.instance();

            const test1 = [0, 1];
            const test2 = [40, 0];
            const test3 = [-40, 0];

            expect(inst._setOpacity(test1[0])).to.equals(test1[1]);
            expect(inst._setOpacity(test2[0])).to.equals(test2[1]);
            expect(inst._setOpacity(test3[0])).to.equals(test3[1]);
        })

        it('应该滑动到上一个日期，当调用_moveToNext方法', () => {
            const spyFunction = sinon.spy();
            const datePicker = mount(
                <DatePicker
                onSelect={spyFunction}/>
            );
            datePicker.instance()._moveToNext(-1);
            datePicker.find('.datepicker-finish-btn').simulate('click');
            sinon.assert.calledWith(spyFunction, nextTime(new Date(), -1));
        })


        it('应该向_moveToNext传入-1, 当滑动到上一个日期', () => {
            const spyFunction = sinon.spy(DatePicker.prototype, '_moveToNext');
            const datePicker = mount(
                <DatePicker />
            );
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 50 }],
            };


            datePicker.find('.datepicker-content').simulate('touchStart', touchstartEvent);
            datePicker.find('.datepicker-content').simulate('touchEnd', touchendEvent);
            sinon.assert.calledWith(spyFunction, -1);
            spyFunction.restore();
        })

    })

    describe('测试交互事件:', () => {
        it('应该触发handleContent3次, 在触摸屏幕之后', () => {
            const spyFunction = sinon.spy(DatePicker.prototype, 'handleContentTouch');
            const datePicker = mount(
                <DatePicker />
            );

            datePicker.find('.datepicker-content').simulate('touchStart');
            datePicker.find('.datepicker-content').simulate('touchMove');
            datePicker.find('.datepicker-content').simulate('touchEnd');
            sinon.assert.callCount(spyFunction, 3);
            spyFunction.restore();
        })

        it('应该触发onSelect, 在点击完成按钮之后', () => {
            const spyFunction = sinon.spy();
            const datePicker = mount(
                <DatePicker
                onSelect={spyFunction}/>
            );
            datePicker.find('.datepicker-finish-btn').simulate('click');
            sinon.assert.calledOnce(spyFunction);
        })


        it('应该向onSelect传入上一个日期, 当向下滑动超过touchLen', () => {
            const spyFunction = sinon.spy();
            const datePicker = mount(
                <DatePicker
                onSelect={spyFunction}/>
            );
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 50 }],
            };

            datePicker.find('.datepicker-content').simulate('touchStart', touchstartEvent);
            datePicker.find('.datepicker-content').simulate('touchEnd', touchendEvent);
            datePicker.find('.datepicker-content').simulate('transitionEnd');
            datePicker.find('.datepicker-finish-btn').simulate('click');
            sinon.assert.calledWith(spyFunction, nextTime(new Date(), -1));
        })

        it('应该向onSelect传入下一个日期, 当向上滑动超过touchLen', () => {
            const spyFunction = sinon.spy();
            const datePicker = mount(
                <DatePicker
                maxDate={nextTime(new Date(), 1)}
                onSelect={spyFunction}/>
            );
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: -50 }],
            };

            datePicker.find('.datepicker-content').simulate('touchStart', touchstartEvent);
            datePicker.find('.datepicker-content').simulate('touchEnd', touchendEvent);
            datePicker.find('.datepicker-content').simulate('transitionEnd');
            datePicker.find('.datepicker-finish-btn').simulate('click');
            sinon.assert.calledWith(spyFunction, nextTime(new Date(), 1));
        })

        it('应该恢复当前日期, 但滑动超过touchLen但上一个日期小于minDate', () => {
            const spyFunction = sinon.spy();
            const datePicker = mount(
                <DatePicker
                minDate={nextTime(new Date())}
                onSelect={spyFunction}/>
            );
            const touchstartEvent = {
                type: 'touchstart',
                targetTouches: [{ pageY: 0 }],
            };
            const touchendEvent = {
                type: 'touchend',
                changedTouches: [{ pageY: 50 }],
            };

            datePicker.find('.datepicker-content').simulate('touchStart', touchstartEvent);
            datePicker.find('.datepicker-content').simulate('touchEnd', touchendEvent);
            datePicker.find('.datepicker-content').simulate('transitionEnd');
            datePicker.find('.datepicker-finish-btn').simulate('click');
            sinon.assert.calledWith(spyFunction, nextTime(new Date(), 0));
        })
    })

});
