/**
 * @module DatePicker Component
 */

import React, { Component, PropTypes } from 'react';
import DatePickerItem from './DatePickerItem.js';
import PureRender from './pureRender.js';
import { convertDate, nextDate } from './time.js';

/**
 * Class DatePicker Component Class
 * @extends Component
 */
class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: nextDate(this.props.value),
        };

        this.handleFinishBtnClick = this.handleFinishBtnClick.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // update value of state
        const date = nextDate(nextProps.value);
        if (date.getTime() !== this.state.value.getTime()) {
            this.setState({ value: date });
        }
    }

    /**
     * Optimization component, Prevents unnecessary rendering
     * Only props or state change or value before re-rendering
     *
     * @param  {Object} nextProps next props
     * @param  {Object} nextState next state
     * @return {Boolean}          Whether re-rendering
     */
    shouldComponentUpdate(nextProps, nextState) {
        const date = nextDate(nextState.value);
        return date.getTime() !== this.state.value.getTime() ||
                PureRender.shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    /**
     * 点击完成按钮事件
     * @return {undefined}
     */
    handleFinishBtnClick() {
        this.props.onSelect(this.state.value);
    }

    /**
     * 选择下一个日期
     * @return {undefined}
     */
    handleDateSelect(value) {
        this.setState({ value });
    }

    /**
     * render函数
     * @return {Object} JSX对象
     */
    render() {
        const { min, max, theme, dateFormat } = this.props;
        const value = this.state.value;
        const themeClassName =
            ['default', 'dark', 'ios', 'android', 'android-dark'].indexOf(theme) === -1 ?
            'default' : theme;

        return (
            <div
                className={`datepicker ${themeClassName}`}>
                <div className="datepicker-header">{convertDate(value, 'YYYY/MM/DD')}</div>
                <div className="datepicker-content">
                    <DatePickerItem
                        value={value}
                        min={min}
                        max={max}
                        typeName="Year"
                        format={dateFormat[0]}
                        onSelect={this.handleDateSelect} />
                    <DatePickerItem
                        value={value}
                        min={min}
                        max={max}
                        typeName="Month"
                        format={dateFormat[1]}
                        onSelect={this.handleDateSelect} />
                    <DatePickerItem
                        value={value}
                        min={min}
                        max={max}
                        typeName="Date"
                        format={dateFormat[2]}
                        onSelect={this.handleDateSelect} />
                </div>
                <div className="datepicker-navbar">
                    <a
                        className="datepicker-navbar-btn"
                        onClick={this.handleFinishBtnClick}>完成</a>
                    <a
                        className="datepicker-navbar-btn"
                        onClick={this.props.onCancel}>取消</a>
                </div>
            </div>
        );
    }
 }

DatePicker.propTypes = {
    theme: PropTypes.string,
    value: PropTypes.object,
    min: PropTypes.object,
    max: PropTypes.object,
    dateFormat: PropTypes.array,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
};

export default DatePicker;
