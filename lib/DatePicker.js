/**
 * @module DatePicker Component
 */

import React, { Component } from 'react';
import DatePickerItem from './DatePickerItem.js';
import PureRender from './pureRender.js';
import { convertDate, nextDate } from './time.js';

type Props = {
    theme: string,
    value: Object,
    min: Object,
    max: Object,
    customHeader?: React.Element<*>,
    showHeader: boolean,
    dateFormat: Array<*>,
    showFormat: string,
    confirmText: string,
    cancelText: string,
    onSelect: Function,
    onCancel: Function,
}

type State = {
    value: Date,
}

/**
 * Class DatePicker Component Class
 * @extends Component
 */
class DatePicker extends Component<void, Props, State> {
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
        const { min, max, theme, dateFormat, confirmText, cancelText, showFormat, showHeader, customHeader } = this.props;
        const value = this.state.value;
        const themeClassName =
            ['default', 'dark', 'ios', 'android', 'android-dark'].indexOf(theme) === -1 ?
            'default' : theme;

        return (
            <div
                className={`datepicker ${themeClassName}`}>
                {showHeader &&
                    <div className="datepicker-header">{customHeader || convertDate(value, showFormat)}</div>}
                <div className="datepicker-content">
                    {dateFormat.map((format, index) => (
                        <DatePickerItem
                            key={index}
                            value={value}
                            min={min}
                            max={max}
                            format={format}
                            onSelect={this.handleDateSelect} />
                    ))}
                </div>
                <div className="datepicker-navbar">
                    <a
                        className="datepicker-navbar-btn"
                        onClick={this.handleFinishBtnClick}>{confirmText}</a>
                    <a
                        className="datepicker-navbar-btn"
                        onClick={this.props.onCancel}>{cancelText}</a>
                </div>
            </div>
        );
    }
 }

export default DatePicker;
