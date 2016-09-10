
/**
 * @module Date组件
 */
import React, { Component, PropTypes } from 'react';
import * as TimeUtil from './time.js';
import {
    TRANSITION,
    TRANSFORM,
} from './transition';

/**
 * Class Date组件类
 * @extends Component
 */
class DatePickerItem extends Component {
    constructor(props) {
        super(props);
        this.animating = false;     // 判断是否在transition过渡动画之中
        this.touchY = 0;            // 保存touchstart的pageY
        this.angle = 0;             // 容器转过的角度
        this.renderDatepickerItem = this.renderDatepickerItem.bind(this);
        this.handleContentTouch = this.handleContentTouch.bind(this);
        this.handleContentTransitionEnd = this.handleContentTransitionEnd.bind(this);
        this.state = {
            angle: 0,
        };
    }

    componentWillMount() {
        const dates = Array(...Array(5)).map((value, index) => {
            const date = TimeUtil[`next${this.props.typeName}`](this.props.date.value, index - 2);
            return {
                ...TimeUtil.getTime(date, this.props.typeName),
                angle: (2 - index) * 22.5,
            };
        });
        this.setState({ dates });
    }

    componentWillReceiveProps(nextProps) {
        // 更新同级的组件日期视图
        const scroll = this.refs.scroll;
        const angle = this.angle;
        const typeName = this.props.typeName;
        const nowVal = this.props.date[typeName].value;
        const nextVal = nextProps.date[typeName].value;
        const nowstamp = this.props.date.timestamp;
        const nextstamp = nextProps.date.timestamp;

        let direction;
        if ((nextVal > nowVal && nextstamp > nowstamp) ||
        (nextVal < nowVal && nextstamp > nowstamp)) direction = 1;
        else if ((nextVal > nowVal && nextstamp < nowstamp) ||
        (nextVal < nowVal && nextstamp < nowstamp)) direction = -1;
        if (direction) {
            this._moveTo(scroll, angle + direction * 22.5);
        }
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
        const { typeName, date, maxDate, minDate } = this.props;
        const nextDate = TimeUtil[`next${typeName}`](date.value, direction);
        const canMove = (direction === 1) ?
            (nextDate.getTime() <= maxDate.timestamp) :
            (nextDate.getTime() >= minDate.timestamp);
        if (canMove) {
            this.props.onSelect(nextDate);
        } else {
            this._moveTo(this.refs.scroll, this.angle);
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
        obj.style[TRANSITION] = `all .2s ease-out`; // eslint-disable-line
        this.setState({
            angle,
        });
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
        const date = this.props.date;
        const newDates = Array(...Array(5)).map((value, index) => {
            const now = TimeUtil[`next${this.props.typeName}`](date.value, index - 2);
            return {
                ...TimeUtil.getTime(now, this.props.typeName),
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
    renderDatepickerItem(date, index) {
        const itemStyle = {
            [TRANSFORM]: `rotateX(${date.angle}deg) translate3d(0,0,100px)`,
            opacity: this._setOpacity(date.angle + this.state.angle),
            color: this.props.dateColor,
        };
        return (
            <li
                key={index}
                style={itemStyle}>
                {date.value}{date.suffix}
            </li>
        );
    }

    render() {
        const scrollStyle = {
            [TRANSFORM]: `rotateX(${this.state.angle}deg)`,
        };

        return (
            <div
                className="datepicker-viewport"
                onTouchStart={this.handleContentTouch}
                onTouchMove={this.handleContentTouch}
                onTouchEnd={this.handleContentTouch}
                onTransitionEnd={this.handleContentTransitionEnd}>
                <ul
                    ref="scroll"
                    className="datepicker-scroll"
                    style={scrollStyle}>
                    {this.state.dates.map(this.renderDatepickerItem)}
                </ul>
            </div>
        );
    }
}

DatePickerItem.propTypes = {
    date: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    typeName: PropTypes.string,
    touchLen: PropTypes.number,
    dateColor: PropTypes.string,
    onSelect: PropTypes.func,
};

export default DatePickerItem;
