(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
  (global.reactMobileDatePicker = factory(global.React,global.ReactDOM));
}(this, (function (React,ReactDOM) { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}
var React__default = 'default' in React ? React['default'] : React;
ReactDOM = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

__$styleInject(".datepicker-modal {\n    position: fixed;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0,0,0,.6);\n    z-index: 999;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n\n.datepicker {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    z-index: 1;\n    height: 266px;\n    font-size: 16px;\n    text-align: center;\n    font-family: arial,verdana,sans-serif;\n    box-sizing: content-box;\n    -webkit-font-smoothing: antialiased;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n\n.datepicker .datepicker-header {\n    padding: 0 .5em;\n    min-height: 2em;\n    line-height: 2em;\n    font-size: 1.125em;\n    display: none;\n}\n\n.datepicker .datepicker-navbar {\n    padding: 0 .5em .5em .5em;\n    overflow: hidden;\n}\n\n.datepicker .datepicker-navbar-btn {\n    height: 2.5em;\n    line-height: 2.5em;\n    float: right;\n    padding: 0 1em;\n    cursor: pointer;\n}\n\n.datepicker .datepicker-content {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding: .5em .25em;\n}\n\n.datepicker .datepicker-col-1 {\n    -webkit-box-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    margin: 0 .25em;\n}\n\n.datepicker .datepicker-viewport {\n    height: 200px;\n    position: relative;\n    overflow: hidden\n}\n\n.datepicker .datepicker-viewport::after {\n    content: '';\n    position: absolute;\n    z-index: 2;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    pointer-events: none;\n}\n\n.datepicker .datepicker-wheel {\n    position: absolute;\n    height: 40px;\n    top: 50%;\n    margin-top: -20px;\n    width: 100%;\n}\n\n.datepicker .datepicker-scroll {\n    list-style-type: none\n}\n\n.datepicker .datepicker-scroll>li {\n    height: 40px;\n    line-height: 40px;\n    font-size: 1.375em;\n    cursor: pointer;\n}\n\n.datepicker {\n\n    /* default */\n\n    /* dark */\n\n    /* ios */\n\n\n    /* android */\n\n    /* android-dark */\n}\n\n.datepicker.default {\n    background-color: #f7f7f7;\n}\n\n.datepicker.default .datepicker-wheel {\n    border-top: 1px solid #4eccc4;\n    border-bottom: 1px solid #4eccc4;\n}\n\n.datepicker.default .datepicker-scroll li {\n    color: rgb(59, 59, 59);\n}\n\n.datepicker.default .datepicker-scroll li.disabled {\n    color: rgb(191, 191, 191);\n}\n\n.datepicker.default .datepicker-navbar-btn {\n    color: #4eccc4;\n}\n\n.datepicker.dark {\n    background-color: #263238;\n}\n\n.datepicker.dark .datepicker-wheel {\n    border-top: 1px solid #50ccc4;\n    border-bottom: 1px solid #50ccc4;\n}\n\n.datepicker.dark .datepicker-scroll li {\n    color: rgb(201, 203, 204);\n}\n\n.datepicker.dark .datepicker-scroll li.disabled {\n    color: rgb(87, 96, 100);\n}\n\n.datepicker.dark .datepicker-navbar-btn {\n    color: #50ccc4;\n}\n\n.datepicker.ios {\n    background-color: #f7f7f7;\n}\n\n.datepicker.ios .datepicker-col-1 {\n    margin: 0;\n}\n\n.datepicker.ios .datepicker-viewport {}\n\n.datepicker.ios .datepicker-viewport::after {\n    background: -webkit-linear-gradient(#f7f7f7,rgba(245,245,245,0)52%,rgba(245,245,245,0)48%,#f7f7f7);\n    background: linear-gradient(#f7f7f7,rgba(245,245,245,0)52%,rgba(245,245,245,0)48%,#f7f7f7);\n}\n\n.datepicker.ios .datepicker-wheel {\n    border-top: 1px solid #dbdbdb;\n    border-bottom: 1px solid #dbdbdb;\n}\n\n.datepicker.ios .datepicker-scroll li {\n    color: rgb(59, 59, 59);\n}\n\n.datepicker.ios .datepicker-scroll li.disabled {\n    color: rgb(191, 191, 191);\n}\n\n.datepicker.ios .datepicker-navbar {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    padding: 0;\n    border-bottom: 1px solid #acacac;\n}\n\n.datepicker.ios .datepicker-navbar-btn {\n    color: #007aff;\n}\n\n.datepicker.ios .datepicker-navbar-btn:nth-child(2) {\n    float: left;\n}\n\n.datepicker.ios .datepicker-content {\n    padding-top: 48px;\n}\n\n.datepicker.android, .datepicker.android-dark {\n    height: 294px;\n    background-color: #f5f5f5;\n}\n\n.datepicker.android .datepicker-header, .datepicker.android-dark .datepicker-header {\n    color: #31b6e7;\n    border-bottom: 2px solid #31b6e7;\n    display: block;\n}\n\n.datepicker.android .datepicker-col-1, .datepicker.android-dark .datepicker-col-1 {\n    margin: 0 .625em;\n}\n\n.datepicker.android .datepicker-viewport, .datepicker.android-dark .datepicker-viewport {}\n\n.datepicker.android .datepicker-viewport::after, .datepicker.android-dark .datepicker-viewport::after {\n    background-image: -webkit-linear-gradient(#f5f5f5,rgba(245,245,245,0)52%,rgba(245,245,245,0)48%,#f5f5f5);\n    background-image: linear-gradient(#f5f5f5,rgba(245,245,245,0)52%,rgba(245,245,245,0)48%,#f5f5f5);\n}\n\n.datepicker.android .datepicker-wheel, .datepicker.android-dark .datepicker-wheel {\n    border-top: 2px solid #31b6e7;\n    border-bottom: 2px solid #31b6e7;\n}\n\n.datepicker.android .datepicker-scroll li, .datepicker.android-dark .datepicker-scroll li {\n    font-size: 1.125em;\n    color: rgb(56, 56, 56);\n}\n\n.datepicker.android .datepicker-scroll li.disabled, .datepicker.android-dark .datepicker-scroll li.disabled {\n    color: rgb(188, 188, 188);\n}\n\n.datepicker.android .datepicker-navbar, .datepicker.android-dark .datepicker-navbar {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    border-top: 1px solid #d9d4d4;\n    padding: 0;\n}\n\n.datepicker.android .datepicker-navbar-btn, .datepicker.android-dark .datepicker-navbar-btn {\n    padding: 0;\n    color: #000;\n    -webkit-box-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n}\n\n.datepicker.android .datepicker-navbar-btn:nth-child(2), .datepicker.android-dark .datepicker-navbar-btn:nth-child(2) {\n    border-left: 1px solid #d9d4d4;\n}\n\n.datepicker.android-dark {\n    background-color: #292829;\n}\n\n.datepicker.android-dark .datepicker-viewport {}\n\n.datepicker.android-dark .datepicker-viewport::after {\n    background-image: -webkit-linear-gradient(#282828,rgba(40,40,40,0)52%,rgba(40,40,40,0)48%,#282828);\n    background-image: linear-gradient(#282828,rgba(40,40,40,0)52%,rgba(40,40,40,0)48%,#282828);\n}\n\n.datepicker.android-dark .datepicker-scroll li {\n    color: rgb(199, 199, 199);\n}\n\n.datepicker.android-dark .datepicker-scroll li.disabled {\n    color: rgb(88, 88, 88);\n}\n\n.datepicker.android-dark .datepicker-navbar {\n    border-color: #424542;\n}\n\n.datepicker.android-dark .datepicker-navbar-btn {\n    color: #fff;\n}\n\n.datepicker.android-dark .datepicker-navbar-btn:nth-child(2) {\n    border-color: #424542;\n}\n", undefined);

/**
 * @module time工具
 */

function throwIfInvalidDate(date) {
    if (Object.prototype.toString.call(date, null) !== '[object Date]') {
        throw new Error('参数类型不对');
    }
}

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * @param  {Date}       日期
 * @return {String}     字符串格式
 */
function convertDate(date, format) {
    var str = format;
    var o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    if (/(Y+)/.test(format)) {
        str = str.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        // eslint-disable-line
        if (new RegExp('(' + k + ')').test(format)) {
            str = str.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(o[k].toString().length));
        }
    }

    return str;
}

/**
 * 获取相对日期的偏移日期
 * @param  {Date}       日期
 * @return {number}     相对的天数
 */
function nextYear(now) {
    var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    throwIfInvalidDate(now);
    var date = new Date(now.getFullYear() + index, now.getMonth(), now.getDate());
    return date;
}

function nextMonth(now) {
    var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    throwIfInvalidDate(now);
    var year = now.getFullYear();
    var month = now.getMonth() + index;
    var dayOfMonth = Math.min(now.getDate(), daysInMonth(year, month));
    var date = new Date(year, month, dayOfMonth);
    return date;
}

function nextDate(now) {
    var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    throwIfInvalidDate(now);
    var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index);
    return date;
}

var TimeUtil = Object.freeze({
    convertDate: convertDate,
    nextYear: nextYear,
    nextMonth: nextMonth,
    nextDate: nextDate
});

function shallowEqual(prev, next) {
    if (prev === next) return true;
    var prevKeys = Object.keys(prev);
    var nextKeys = Object.keys(next);

    if (prevKeys !== nextKeys) return false;

    return prevKeys.every(function (key) {
        return prevKeys.hasOwnProperty(key) && prevKeys[key] === nextKeys[key];
    });
}

function PureRender(Component) {
    Component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return PureRender.shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    };
}

PureRender.shouldComponentUpdate = function (nextProps, nextState, preProps, preState) {
    return !shallowEqual(preProps, nextProps) || !shallowEqual(preState, nextState);
};

var TRANSITION = null;
var TRANSITIONEND = null;
var TRANSITION_CSS = null;
if (typeof document.body.style.transition === 'string') {
    TRANSITION = 'transition';
    TRANSITIONEND = 'transitionend';
    TRANSITION_CSS = 'transition';
} else if (typeof document.body.style.webkitTransition === 'string') {
    TRANSITION = 'WebkitTransition';
    TRANSITION_CSS = '-webkit-transition';
    TRANSITIONEND = 'webkitTransitionEnd';
}

var TRANSFORM = null;
var TRANSFORM_CSS = null;
if (typeof document.body.style.transform === 'string') {
    TRANSFORM = 'transform';
    TRANSFORM_CSS = 'transform';
} else if (typeof document.body.style.webkitTransform === 'string') {
    TRANSFORM = 'WebkitTransform';
    TRANSFORM_CSS = '-webkit-transform';
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * @module Date组件
 */
var DATE_HEIGHT = 40; // 每个日期的高度
var DATE_LENGTH = 10; // 日期的个数
var MIDDLE_INDEX = Math.floor(DATE_LENGTH / 2); // 日期数组中间值的索引
var MIDDLE_Y = -DATE_HEIGHT * MIDDLE_INDEX; // translateY值

/**
 * Class Date组件类
 * @extends Component
 */

var DatePickerItem = function (_Component) {
    inherits(DatePickerItem, _Component);

    function DatePickerItem(props) {
        classCallCheck(this, DatePickerItem);

        var _this = possibleConstructorReturn(this, _Component.call(this, props));

        _this.animating = false; // 判断是否在transition过渡动画之中
        _this.touchY = 0; // 保存touchstart的pageY
        _this.translateY = 0; // 容器偏移的距离
        _this.currentIndex = MIDDLE_INDEX; // 滑动中当前日期的索引

        _this.state = {
            translateY: MIDDLE_Y,
            marginTop: (_this.currentIndex - MIDDLE_INDEX) * DATE_HEIGHT
        };

        _this.renderDatepickerItem = _this.renderDatepickerItem.bind(_this);
        _this.handleContentTouch = _this.handleContentTouch.bind(_this);
        _this.handleContentMouseDown = _this.handleContentMouseDown.bind(_this);
        _this.handleContentMouseMove = _this.handleContentMouseMove.bind(_this);
        _this.handleContentMouseUp = _this.handleContentMouseUp.bind(_this);
        return _this;
    }

    DatePickerItem.prototype.componentWillMount = function componentWillMount() {
        this._iniDates(this.props.value);
    };

    DatePickerItem.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.value.getTime() === this.props.value.getTime()) {
            return;
        }
        this._iniDates(nextProps.value);
        this.currentIndex = MIDDLE_INDEX;
        this.setState({
            translateY: MIDDLE_Y,
            marginTop: (this.currentIndex - MIDDLE_INDEX) * DATE_HEIGHT
        });
    };

    /**
     * Optimization component, Prevents unnecessary rendering
     * Only value or state change should re-rendering
     *
     * @param  {Object} nextProps next props
     * @param  {Object} nextState next state
     * @return {Boolean}          Whether re-rendering
     */


    DatePickerItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value.getTime() !== this.props.value.getTime() || !shallowEqual(nextState, this.state);
    };

    DatePickerItem.prototype._iniDates = function _iniDates(date) {
        var typeName = this.props.typeName;

        var dates = Array.apply(undefined, Array(DATE_LENGTH)).map(function (value, index) {
            return TimeUtil['next' + typeName](date, index - MIDDLE_INDEX);
        });
        this.setState({ dates: dates });
    };

    DatePickerItem.prototype._updateDates = function _updateDates(direction) {
        var typeName = this.props.typeName;
        var dates = this.state.dates;

        if (direction === 1) {
            this.currentIndex++;
            this.setState({
                dates: [].concat(dates.slice(1), [TimeUtil['next' + typeName](dates[dates.length - 1], 1)]),
                marginTop: (this.currentIndex - MIDDLE_INDEX) * DATE_HEIGHT
            });
        } else {
            this.currentIndex--;
            this.setState({
                dates: [TimeUtil['next' + typeName](dates[0], -1)].concat(dates.slice(0, dates.length - 1)),
                marginTop: (this.currentIndex - MIDDLE_INDEX) * DATE_HEIGHT
            });
        }
    };

    DatePickerItem.prototype._checkIsUpdateDates = function _checkIsUpdateDates(direction, translateY) {
        return direction === 1 ? this.currentIndex * DATE_HEIGHT + DATE_HEIGHT / 2 < -translateY : this.currentIndex * DATE_HEIGHT - DATE_HEIGHT / 2 > -translateY;
    };

    /**
     * 清除对象的transition样式
     * @param  {Dom}     obj     指定的对象
     * @return {undefined}
     */


    DatePickerItem.prototype._clearTransition = function _clearTransition(obj) {
        obj.style[TRANSITION] = ''; // eslint-disable-line
    };

    /**
     * 滑动到下一日期
     * @param  {number} direction 滑动方向
     * @return {undefined}
     */


    DatePickerItem.prototype._moveToNext = function _moveToNext(direction) {
        var date = this.state.dates[MIDDLE_INDEX];
        var _props = this.props;
        var max = _props.max;
        var min = _props.min;

        if (direction === -1 && date.getTime() < min.getTime()) {
            this._updateDates(1);
        } else if (direction === 1 && date.getTime() > max.getTime()) {
            this._updateDates(-1);
        }

        this._moveTo(this.refs.scroll, this.currentIndex);
    };

    /**
     * 添加滑动动画
     * @param  {DOM} obj   DOM对象
     * @param  {number} angle 角度
     * @return {undefined}
     */


    DatePickerItem.prototype._moveTo = function _moveTo(obj, currentIndex) {
        var _this2 = this;

        this.animating = true;
        obj.style[TRANSITION] = TRANSFORM_CSS + ' .2s ease-out'; // eslint-disable-line
        this.setState({
            translateY: -currentIndex * DATE_HEIGHT
        });
        setTimeout(function () {
            _this2.animating = false;
            _this2.props.onSelect(_this2.state.dates[MIDDLE_INDEX]);
            _this2._clearTransition(_this2.refs.scroll);
        }, 200);
    };

    DatePickerItem.prototype.handleStart = function handleStart(event) {
        this.touchY = event.pageY || event.targetTouches[0].pageY;
        this.translateY = this.state.translateY;
    };

    DatePickerItem.prototype.handleMove = function handleMove(event) {
        var touchY = event.pageY || event.targetTouches[0].pageY;
        var dir = touchY - this.touchY;
        var translateY = this.translateY + dir;
        var direction = dir > 0 ? -1 : 1;

        // 日期最小值，最大值限制
        var date = this.state.dates[MIDDLE_INDEX];
        var _props2 = this.props;
        var max = _props2.max;
        var min = _props2.min;

        if (date.getTime() < min.getTime() || date.getTime() > max.getTime()) {
            return;
        }

        // 检测是否更新日期列表
        if (this._checkIsUpdateDates(direction, translateY)) {
            this._updateDates(direction);
        }

        this.setState({ translateY: translateY });
    };

    DatePickerItem.prototype.handleEnd = function handleEnd(event) {
        var touchY = event.pageY || event.changedTouches[0].pageY;
        var dir = touchY - this.touchY;
        var direction = dir > 0 ? -1 : 1;
        this._moveToNext(direction);
    };

    /**
     * 滑动日期选择器触屏事件
     * @param  {Object} event 事件对象
     * @return {undefined}
     */


    DatePickerItem.prototype.handleContentTouch = function handleContentTouch(event) {
        event.preventDefault();
        if (this.animating) return;
        if (event.type === 'touchstart') {
            this.handleStart(event);
        } else if (event.type === 'touchmove') {
            this.handleMove(event);
        } else if (event.type === 'touchend') {
            this.handleEnd(event);
        }
    };

    /**
     * 滑动日期选择器鼠标事件
     * @param  {Object} event 事件对象
     * @return {undefined}
     */


    DatePickerItem.prototype.handleContentMouseDown = function handleContentMouseDown(event) {
        if (this.animating) return;
        this.handleStart(event);
        document.addEventListener('mousemove', this.handleContentMouseMove);
        document.addEventListener('mouseup', this.handleContentMouseUp);
    };

    DatePickerItem.prototype.handleContentMouseMove = function handleContentMouseMove(event) {
        if (this.animating) return;
        this.handleMove(event);
    };

    DatePickerItem.prototype.handleContentMouseUp = function handleContentMouseUp(event) {
        if (this.animating) return;
        this.handleEnd(event);
        document.removeEventListener('mousemove', this.handleContentMouseMove);
        document.removeEventListener('mouseup', this.handleContentMouseUp);
    };

    /**
     * 渲染一个日期DOM对象
     * @param  {Object} date date数据
     * @return {Object}      JSX对象
     */


    DatePickerItem.prototype.renderDatepickerItem = function renderDatepickerItem(date, index) {
        var className = date < this.props.min || date > this.props.max ? 'disabled' : '';

        return React__default.createElement(
            'li',
            {
                key: index,
                className: className },
            convertDate(date, this.props.format)
        );
    };

    DatePickerItem.prototype.render = function render() {
        var _scrollStyle;

        var scrollStyle = (_scrollStyle = {}, _scrollStyle[TRANSFORM] = 'translateY(' + this.state.translateY + 'px)', _scrollStyle.marginTop = this.state.marginTop, _scrollStyle);

        return React__default.createElement(
            'div',
            { className: 'datepicker-col-1' },
            React__default.createElement(
                'div',
                {
                    className: 'datepicker-viewport',
                    onTouchStart: this.handleContentTouch,
                    onTouchMove: this.handleContentTouch,
                    onTouchEnd: this.handleContentTouch,
                    onMouseDown: this.handleContentMouseDown },
                React__default.createElement(
                    'div',
                    { className: 'datepicker-wheel' },
                    React__default.createElement(
                        'ul',
                        {
                            ref: 'scroll',
                            className: 'datepicker-scroll',
                            style: scrollStyle },
                        this.state.dates.map(this.renderDatepickerItem)
                    )
                )
            )
        );
    };

    return DatePickerItem;
}(React.Component);

DatePickerItem.propTypes = {
    value: React.PropTypes.object,
    min: React.PropTypes.object,
    max: React.PropTypes.object,
    format: React.PropTypes.string,
    typeName: React.PropTypes.string,
    onSelect: React.PropTypes.func
};

/**
 * @module DatePicker Component
 */

/**
 * Class DatePicker Component Class
 * @extends Component
 */

var DatePicker = function (_Component) {
    inherits(DatePicker, _Component);

    function DatePicker(props) {
        classCallCheck(this, DatePicker);

        var _this = possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            value: nextDate(_this.props.value)
        };

        _this.handleFinishBtnClick = _this.handleFinishBtnClick.bind(_this);
        _this.handleDateSelect = _this.handleDateSelect.bind(_this);
        return _this;
    }

    DatePicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        // update value of state
        var date = nextDate(nextProps.value);
        if (date.getTime() !== this.state.value.getTime()) {
            this.setState({ value: date });
        }
    };

    /**
     * Optimization component, Prevents unnecessary rendering
     * Only props or state change or value before re-rendering
     *
     * @param  {Object} nextProps next props
     * @param  {Object} nextState next state
     * @return {Boolean}          Whether re-rendering
     */


    DatePicker.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        var date = nextDate(nextState.value);
        return date.getTime() !== this.state.value.getTime() || PureRender.shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    };

    /**
     * 点击完成按钮事件
     * @return {undefined}
     */


    DatePicker.prototype.handleFinishBtnClick = function handleFinishBtnClick() {
        this.props.onSelect(this.state.value);
    };

    /**
     * 选择下一个日期
     * @return {undefined}
     */


    DatePicker.prototype.handleDateSelect = function handleDateSelect(value) {
        this.setState({ value: value });
    };

    /**
     * render函数
     * @return {Object} JSX对象
     */


    DatePicker.prototype.render = function render() {
        var _props = this.props;
        var min = _props.min;
        var max = _props.max;
        var theme = _props.theme;
        var dateFormat = _props.dateFormat;

        var value = this.state.value;
        var themeClassName = ['default', 'dark', 'ios', 'android', 'android-dark'].indexOf(theme) === -1 ? 'default' : theme;

        return React__default.createElement(
            'div',
            {
                className: 'datepicker ' + themeClassName },
            React__default.createElement(
                'div',
                { className: 'datepicker-header' },
                convertDate(value, 'YYYY/MM/DD')
            ),
            React__default.createElement(
                'div',
                { className: 'datepicker-content' },
                React__default.createElement(DatePickerItem, {
                    value: value,
                    min: min,
                    max: max,
                    typeName: 'Year',
                    format: dateFormat[0],
                    onSelect: this.handleDateSelect }),
                React__default.createElement(DatePickerItem, {
                    value: value,
                    min: min,
                    max: max,
                    typeName: 'Month',
                    format: dateFormat[1],
                    onSelect: this.handleDateSelect }),
                React__default.createElement(DatePickerItem, {
                    value: value,
                    min: min,
                    max: max,
                    typeName: 'Date',
                    format: dateFormat[2],
                    onSelect: this.handleDateSelect })
            ),
            React__default.createElement(
                'div',
                { className: 'datepicker-navbar' },
                React__default.createElement(
                    'a',
                    {
                        className: 'datepicker-navbar-btn',
                        onClick: this.handleFinishBtnClick },
                    '完成'
                ),
                React__default.createElement(
                    'a',
                    {
                        className: 'datepicker-navbar-btn',
                        onClick: this.props.onCancel },
                    '取消'
                )
            )
        );
    };

    return DatePicker;
}(React.Component);

DatePicker.propTypes = {
    theme: React.PropTypes.string,
    value: React.PropTypes.object,
    min: React.PropTypes.object,
    max: React.PropTypes.object,
    dateFormat: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    onCancel: React.PropTypes.func
};

var renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

var Modal = function (_Component) {
    inherits(Modal, _Component);

    function Modal() {
        classCallCheck(this, Modal);
        return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Modal.prototype.componentDidMount = function componentDidMount() {
        this._div = document.createElement('div');
        this._div.classList.add('Modal-Portal');
        document.body.appendChild(this._div);
        this.renderPortal(this.props);
    };

    Modal.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        this.renderPortal(newProps);
    };

    Modal.prototype.componentWillUnmount = function componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this._div);
        this._div.parentNode.removeChild(this._div);
    };

    Modal.prototype.renderPortal = function renderPortal(props) {
        var portal = React__default.cloneElement(this.props.children, _extends({}, props, { key: 'portal' }), null);

        this.portal = renderSubtreeIntoContainer(this, portal, this._div);
    };

    Modal.prototype.render = function render() {
        return React__default.createElement('noscript', null);
    };

    return Modal;
}(React.Component);

Modal.propTypes = {
    children: React.PropTypes.node,
    isOpen: React.PropTypes.bool
};
Modal.defaultProps = {
    isOpen: false
};

function EnhanceDatePicker(_ref) {
    var isOpen = _ref.isOpen;
    var props = objectWithoutProperties(_ref, ['isOpen']);

    function onModalClose(event) {
        if (event.target === event.currentTarget) {
            props.onCancel();
        }
    }

    return React__default.createElement(
        'div',
        {
            style: { display: isOpen ? '' : 'none' },
            onClick: onModalClose,
            className: 'datepicker-modal' },
        React__default.createElement(DatePicker, props)
    );
}

function ModalDatePicker(props) {
    return React__default.createElement(
        Modal,
        props,
        React__default.createElement(EnhanceDatePicker, null)
    );
}

ModalDatePicker.propTypes = {
    isOpen: React.PropTypes.bool,
    theme: React.PropTypes.string,
    value: React.PropTypes.object,
    min: React.PropTypes.object,
    max: React.PropTypes.object,
    dateFormat: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    onCancel: React.PropTypes.func
};

ModalDatePicker.defaultProps = {
    isOpen: false,
    theme: 'default',
    value: new Date(),
    min: new Date(1970, 0, 1),
    max: new Date(2050, 0, 1),
    dateFormat: ['YYYY', 'M', 'D'],
    onSelect: function () {},
    onCancel: function () {}
};

return ModalDatePicker;

})));
//# sourceMappingURL=react-mobile-datepicker.js.map
