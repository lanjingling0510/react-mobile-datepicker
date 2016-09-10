/**
 * @module DatePicker组件
 */

import React, { Component, PropTypes } from 'react';
import DatePickerItem from './DatePickerItem.js';
import { nextDate, getTime } from './time.js';

/**
 * Class DatePicker组件类
 * @extends Component
 */
class DatePicker extends Component {
    constructor(props) {
        super(props); // 容器转过的角度
        this.state = {
            date: this._productDate(props.date),
            minDate: this._productDate(props.minDate),
            maxDate: this._productDate(props.maxDate),
        };

        this.handleFinishBtnClick = this.handleFinishBtnClick.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            date: this._productDate(nextProps.date),
            minDate: this._productDate(nextProps.minDate),
            maxDate: this._productDate(nextProps.maxDate),
        });
    }

    _productDate(date) {
        const nDate = nextDate(date, 0);
        return {
            value: nDate,
            timestamp: nDate.getTime(),
            Year: getTime(nDate, 'Year'),
            Month: getTime(nDate, 'Month'),
            Date: getTime(nDate, 'Date'),
        };
    }

    /**
     * 点击完成按钮事件
     * @return {undefined}
     */
    handleFinishBtnClick() {
        this.props.onSelect(this.state.date.value);
    }

    /**
     * 选择下一个日期
     * @return {undefined}
     */
    handleDateSelect(date) {
        this.setState({ date: this._productDate(date) });
    }

    /**
     * render函数
     * @return {Object} JSX对象
     */
    render() {
        const { layerBackground, btnColor, touchLen, dateColor } = this.props;
        const { date, minDate, maxDate } = this.state;
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
                <div className="datepicker-content">
                    <DatePickerItem
                        date={date}
                        typeName="Year"
                        minDate={minDate}
                        maxDate={maxDate}
                        touchLen={touchLen}
                        dateColor={dateColor}
                        onSelect={this.handleDateSelect} />
                    <DatePickerItem
                        date={date}
                        typeName="Month"
                        minDate={minDate}
                        maxDate={maxDate}
                        touchLen={touchLen}
                        dateColor={dateColor}
                        onSelect={this.handleDateSelect} />
                    <DatePickerItem
                        date={date}
                        typeName="Date"
                        minDate={minDate}
                        maxDate={maxDate}
                        touchLen={touchLen}
                        dateColor={dateColor}
                        onSelect={this.handleDateSelect} />
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
    date: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    onSelect: PropTypes.func,
};


export default DatePicker;
