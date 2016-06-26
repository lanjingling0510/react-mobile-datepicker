/**
 * @module DatePicker组件
 */

import React, { Component, PropTypes } from 'react';
import { nextTime, getTimeName } from './time.js';
import {
    TRANSITION,
    TRANSFORM,
    TRANSFORM_CSS,
} from './transition';

/**
 * Class DatePicker组件类
 * @extends Component
 */
class DatePicker extends Component {
    constructor(props) {
        super(props);
        const dates = Array(...Array(5)).map((value, index) => {
            const now = nextTime(props.startDate, index - 2);
            return {
                name: getTimeName(now),
                value: now,
                angle: (2 - index) * 22.5,
            };
        });

        this.animating = false;     // 判断是否在transition过渡动画之中
        this.touchY = 0;            // 保存touchstart的pageY
        this.angle = 0;             // 容器转过的角度
        this.state = {
            angle: 0,
            dates,
        };

        this.handleFinishBtnClick = this.handleFinishBtnClick.bind(this);
        this.renderDatepickerItem = this.renderDatepickerItem.bind(this);
        this.handleContentTouch = this.handleContentTouch.bind(this);
        this.handleContentTransitionEnd = this.handleContentTransitionEnd.bind(this);
        this._moveToNext = this._moveToNext.bind(this);
    }

    /**
     * 根据角度返回透明度(0-1之间)
     * @param {number} angle 角度
     * @return
     */
    _setOpacity(angle) {
        return angle > 0
            ? ((40 - angle) / 40 * 100 | 0) / 100
            : ((40 + angle) / 40 * 100 | 0) / 100;
    }

    /**
     * 清除对象的transition样式
     * @param  {Dom}     obj     指定的对象
     * @return {undefined}
     */
    _clearTransition(obj) {
        obj.style[TRANSITION] = ''; // eslint-disable-line
    }

    /**
     * 滑动到下一日期
     * @param  {number} direction 滑动方向
     * @return {undefined}
     */
    _moveToNext(direction) {
        const scroll = this.refs.scroll;
        const angle = this.angle;
        const { maxDate, minDate } = this.props;

        const date = (direction === 1) ?
                    this.state.dates.find(value =>
                        value.value.getTime() > nextTime(maxDate, 0).getTime() &&
                            angle + direction * 22.5 + value.angle === 0) :
                    this.state.dates.find(value =>
                        value.value.getTime() < nextTime(minDate, 0).getTime() &&
                            angle + direction * 22.5 + value.angle === 0);
        if (date) {
            this._moveTo(scroll, angle);
        } else {
            this._moveTo(scroll, angle + direction * 22.5);
        }
    }

    /**
     * 添加滑动动画
     * @param  {DOM} obj   DOM对象
     * @param  {number} angle 角度
     * @return {undefined}
     */
    _moveTo(obj, angle) {
        this.animating = true;
        obj.style[TRANSITION] = `${TRANSFORM_CSS} .2s ease-out`; // eslint-disable-line
        this.setState({
            angle,
        });
    }

    /**
     * 点击完成按钮事件
     * @return {undefined}
     */
    handleFinishBtnClick() {
        const date = this.state.dates.find(value => value.angle + this.state.angle === 0);
        this.props.onSelect(date.value);
    }

    /**
     * 滑动日期选择器事件
     * @param  {Object} event 事件对象
     * @return {undefined}
     */
    handleContentTouch(event) {
        event.preventDefault();
        if (this.animating) return;
        if (event.type === 'touchstart') {
            this.touchY = event.targetTouches[0].pageY;
            this.angle = this.state.angle;
        } else if (event.type === 'touchmove') {
            const touchY = event.targetTouches[0].pageY;
            const dir = touchY - this.touchY;
            const angle = this.angle - parseInt(22.5 * dir / 180, 10);
            this.setState({ angle });
        } else if (event.type === 'touchend') {
            const touchY = event.changedTouches[0].pageY;
            const dir = touchY - this.touchY;
            const direction = dir > 0 ? -1 : 1;
            if ((direction === 1 && this.props.touchLen < -dir) ||
                (direction === -1 && this.props.touchLen < dir)) {
                this._moveToNext(direction);
            } else {
                this._moveTo(this.refs.scroll, this.angle);
            }
        }
    }

    /**
     * transition过渡完成事件
     * @return {undefined}
     */
    handleContentTransitionEnd() {
        const { dates, angle } = this.state;
        const date = dates.find(value => value.angle + angle === 0);
        const newDates = Array(...Array(5)).map((value, index) => {
            const now = nextTime(date.value, index - 2);
            return {
                name: getTimeName(now),
                value: now,
                angle: (2 - index) * 22.5,
            };
        });
        this.animating = false;
        this._clearTransition(this.refs.scroll);
        this.setState({
            dates: newDates,
            angle: 0,
        });
    }

    /**
     * 渲染一个日期DOM对象
     * @param  {Object} date date数据
     * @return {Object}      JSX对象
     */
    renderDatepickerItem(date) {
        const itemStyle = {
            [TRANSFORM]: `rotateX(${date.angle}deg) translate3d(0,0,100px)`,
            opacity: this._setOpacity(date.angle + this.state.angle),
            color: this.props.dateColor,
        };
        return (
            <li
                key={date.value}
                style={itemStyle}>
                {date.name}
            </li>
        );
    }

    /**
     * render函数
     * @return {Object} JSX对象
     */
    render() {
        const { layerBackground, btnColor } = this.props;
        const scrollStyle = {
            [TRANSFORM]: `rotateX(${this.state.angle}deg)`,
        };

        const datePickerStyle = {
            backgroundColor: layerBackground,
        };

        return (
            <div
                className="datepicker"
                style={datePickerStyle}>
                <p className="datepicker-navbar">
                    <span
                        style={{ color: btnColor }}
                        className="datepicker-finish-btn"
                        onClick={this.handleFinishBtnClick}>完成</span>
                </p>
                <div
                    ref="parent"
                    className="datepicker-content"
                    onTouchStart={this.handleContentTouch}
                    onTouchMove={this.handleContentTouch}
                    onTouchEnd={this.handleContentTouch}
                    onTransitionEnd={this.handleContentTransitionEnd}>
                    <div className="datepicker-viewport">
                        <ul
                            ref="scroll"
                            className="datepicker-scroll"
                            style={scrollStyle}>
                            {this.state.dates.map(this.renderDatepickerItem)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
 }

DatePicker.propTypes = {
    touchLen: PropTypes.number,
    btnColor: PropTypes.string,
    dateColor: PropTypes.string,
    layerBackground: PropTypes.string,
    startDate: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    onSelect: PropTypes.func,
};

DatePicker.defaultProps = {
    touchLen: 40,
    dateColor: '#fff',
    btnColor: '#fff',
    layerBackground: '#ffa70b',
    startDate: nextTime(new Date(), 0),
    minDate: nextTime(new Date(), -30),
    maxDate: nextTime(new Date(), 0),
    onSelect: () => {},
};

export default DatePicker;
