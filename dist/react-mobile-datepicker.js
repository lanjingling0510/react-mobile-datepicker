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

__$styleInject(".datepicker-modal {\n    position: fixed;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0,0,0,.6);\n    z-index: 999;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n\n.datepicker {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    z-index: 1;\n    border-top: 2px solid rgb(215,212,212);\n    height: 244px;\n    font-size: 12px;\n}\n\n.datepicker .datepicker-navbar {\n    background: rgba(242, 241, 240, 0.3);\n    padding: 0.5em 0.8em;\n    text-align: right;\n}\n\n.datepicker .datepicker-finish-btn {\n    font: 1.2em/17px 微软雅黑;\n}\n\n.datepicker .datepicker-content {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    position: absolute;\n    top: 39px;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: 0 .5em .5em .5em;\n}\n\n.datepicker .datepicker-viewport {\n    padding-top: 84px;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.2) 100%);\n    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.2) 100%);\n    margin: 0 0.5em;\n}\n\n.datepicker .datepicker-scroll {\n    -webkit-transform-style: preserve-3d;\n            transform-style: preserve-3d;\n    -webkit-perspective: 800px;\n            perspective: 800px;\n    position: relative;\n    list-style-type: none;\n    height: 33px;\n    z-index: -1;\n}\n\n.datepicker .datepicker-scroll>li {\n    text-align: center;\n    position: absolute;\n    top: 0;\n    left: 0;\n    font-size: 1.5em;\n    width: 100%;\n    line-height: 35px;\n}\n", undefined);

/**
 * @module time工具
 */

function convertDate(date, formate) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return formate.replace(/Y+/, year).replace(/M+/, month).replace(/D+/, day).replace(/h+/, hour).replace(/m+/, minute).replace(/s+/, second);
}

function throwIfInvalidDate(date) {
    if (Object.prototype.toString.call(date, null) !== '[object Date]') {
        throw new Error('参数类型不对');
    }
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
    var date = new Date(now.getFullYear(), now.getMonth() + index, now.getDate());
    return date;
}

function nextDate(now) {
    var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    throwIfInvalidDate(now);
    var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index);
    return date;
}

/**
 * 获取指定日期年，月或日
 * @param  {Date}     日期
 * @return {String}   格式化日期名称
 */
function getTime(date, type) {
    throwIfInvalidDate(date);
    var units = {
        Year: ['YYYY', '年'],
        Month: ['MM', '月'],
        Date: ['DD', '日']
    };

    if (!units[type]) throw new Error('类型不对');

    var result = {
        value: parseInt(convertDate(date, units[type][0]), 10),
        suffix: units[type][1]
    };
    return result;
}

var TimeUtil = Object.freeze({
    convertDate: convertDate,
    nextYear: nextYear,
    nextMonth: nextMonth,
    nextDate: nextDate,
    getTime: getTime
});

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
        _this.angle = 0; // 容器转过的角度
        _this.renderDatepickerItem = _this.renderDatepickerItem.bind(_this);
        _this.handleContentTouch = _this.handleContentTouch.bind(_this);
        _this.handleContentTransitionEnd = _this.handleContentTransitionEnd.bind(_this);
        _this.state = {
            angle: 0
        };
        return _this;
    }

    DatePickerItem.prototype.componentWillMount = function componentWillMount() {
        var _this2 = this;

        var dates = Array.apply(undefined, Array(5)).map(function (value, index) {
            var date = TimeUtil['next' + _this2.props.typeName](_this2.props.date.value, index - 2);
            return _extends({}, getTime(date, _this2.props.typeName), {
                angle: (2 - index) * 22.5
            });
        });
        this.setState({ dates: dates });
    };

    DatePickerItem.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        // 更新同级的组件日期视图
        var scroll = this.refs.scroll;
        var angle = this.angle;
        var typeName = this.props.typeName;
        var nowVal = this.props.date[typeName].value;
        var nextVal = nextProps.date[typeName].value;
        var nowstamp = this.props.date.timestamp;
        var nextstamp = nextProps.date.timestamp;

        var direction = void 0;
        if (nextVal > nowVal && nextstamp > nowstamp || nextVal < nowVal && nextstamp > nowstamp) direction = 1;else if (nextVal > nowVal && nextstamp < nowstamp || nextVal < nowVal && nextstamp < nowstamp) direction = -1;
        if (direction) {
            this._moveTo(scroll, angle + direction * 22.5);
        }
    };

    /**
     * 根据角度返回透明度(0-1之间)
     * @param {number} angle 角度
     * @return
     */


    DatePickerItem.prototype._setOpacity = function _setOpacity(angle) {
        return angle > 0 ? ((40 - angle) / 40 * 100 | 0) / 100 : ((40 + angle) / 40 * 100 | 0) / 100;
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
        var _props = this.props;
        var typeName = _props.typeName;
        var date = _props.date;
        var maxDate = _props.maxDate;
        var minDate = _props.minDate;

        var nextDate = TimeUtil['next' + typeName](date.value, direction);
        var canMove = direction === 1 ? nextDate.getTime() <= maxDate.timestamp : nextDate.getTime() >= minDate.timestamp;
        if (canMove) {
            this.props.onSelect(nextDate);
        } else {
            this._moveTo(this.refs.scroll, this.angle);
        }
    };

    /**
     * 添加滑动动画
     * @param  {DOM} obj   DOM对象
     * @param  {number} angle 角度
     * @return {undefined}
     */


    DatePickerItem.prototype._moveTo = function _moveTo(obj, angle) {
        this.animating = true;
        obj.style[TRANSITION] = 'all .2s ease-out'; // eslint-disable-line
        this.setState({
            angle: angle
        });
    };

    /**
     * 滑动日期选择器事件
     * @param  {Object} event 事件对象
     * @return {undefined}
     */


    DatePickerItem.prototype.handleContentTouch = function handleContentTouch(event) {
        event.preventDefault();
        if (this.animating) return;
        if (event.type === 'touchstart') {
            this.touchY = event.targetTouches[0].pageY;
            this.angle = this.state.angle;
        } else if (event.type === 'touchmove') {
            var touchY = event.targetTouches[0].pageY;
            var dir = touchY - this.touchY;
            var angle = this.angle - parseInt(22.5 * dir / 180, 10);
            this.setState({ angle: angle });
        } else if (event.type === 'touchend') {
            var _touchY = event.changedTouches[0].pageY;
            var _dir = _touchY - this.touchY;
            var direction = _dir > 0 ? -1 : 1;
            if (direction === 1 && this.props.touchLen < -_dir || direction === -1 && this.props.touchLen < _dir) {
                this._moveToNext(direction);
            } else {
                this._moveTo(this.refs.scroll, this.angle);
            }
        }
    };

    /**
     * transition过渡完成事件
     * @return {undefined}
     */


    DatePickerItem.prototype.handleContentTransitionEnd = function handleContentTransitionEnd() {
        var _this3 = this;

        var date = this.props.date;
        var newDates = Array.apply(undefined, Array(5)).map(function (value, index) {
            var now = TimeUtil['next' + _this3.props.typeName](date.value, index - 2);
            return _extends({}, getTime(now, _this3.props.typeName), {
                angle: (2 - index) * 22.5
            });
        });

        this.animating = false;
        this._clearTransition(this.refs.scroll);
        this.setState({
            dates: newDates,
            angle: 0
        });
    };

    /**
     * 渲染一个日期DOM对象
     * @param  {Object} date date数据
     * @return {Object}      JSX对象
     */


    DatePickerItem.prototype.renderDatepickerItem = function renderDatepickerItem(date, index) {
        var _itemStyle;

        var itemStyle = (_itemStyle = {}, _itemStyle[TRANSFORM] = 'rotateX(' + date.angle + 'deg) translate3d(0,0,100px)', _itemStyle.opacity = this._setOpacity(date.angle + this.state.angle), _itemStyle.color = this.props.dateColor, _itemStyle);
        return React__default.createElement(
            'li',
            {
                key: index,
                style: itemStyle },
            date.value,
            date.suffix
        );
    };

    DatePickerItem.prototype.render = function render() {
        var _scrollStyle;

        var scrollStyle = (_scrollStyle = {}, _scrollStyle[TRANSFORM] = 'rotateX(' + this.state.angle + 'deg)', _scrollStyle);

        return React__default.createElement(
            'div',
            {
                className: 'datepicker-viewport',
                onTouchStart: this.handleContentTouch,
                onTouchMove: this.handleContentTouch,
                onTouchEnd: this.handleContentTouch,
                onTransitionEnd: this.handleContentTransitionEnd },
            React__default.createElement(
                'ul',
                {
                    ref: 'scroll',
                    className: 'datepicker-scroll',
                    style: scrollStyle },
                this.state.dates.map(this.renderDatepickerItem)
            )
        );
    };

    return DatePickerItem;
}(React.Component);

DatePickerItem.propTypes = {
    date: React.PropTypes.object,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    typeName: React.PropTypes.string,
    touchLen: React.PropTypes.number,
    dateColor: React.PropTypes.string,
    onSelect: React.PropTypes.func
};

/**
 * @module DatePicker组件
 */

/**
 * Class DatePicker组件类
 * @extends Component
 */

var DatePicker = function (_Component) {
    inherits(DatePicker, _Component);

    function DatePicker(props) {
        classCallCheck(this, DatePicker);
        // 容器转过的角度

        var _this = possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            date: _this._productDate(props.date),
            minDate: _this._productDate(props.minDate),
            maxDate: _this._productDate(props.maxDate)
        };

        _this.handleFinishBtnClick = _this.handleFinishBtnClick.bind(_this);
        _this.handleDateSelect = _this.handleDateSelect.bind(_this);
        return _this;
    }

    DatePicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.setState({
            date: this._productDate(nextProps.date),
            minDate: this._productDate(nextProps.minDate),
            maxDate: this._productDate(nextProps.maxDate)
        });
    };

    DatePicker.prototype._productDate = function _productDate(date) {
        var nDate = nextDate(date, 0);
        return {
            value: nDate,
            timestamp: nDate.getTime(),
            Year: getTime(nDate, 'Year'),
            Month: getTime(nDate, 'Month'),
            Date: getTime(nDate, 'Date')
        };
    };

    /**
     * 点击完成按钮事件
     * @return {undefined}
     */


    DatePicker.prototype.handleFinishBtnClick = function handleFinishBtnClick() {
        this.props.onSelect(this.state.date.value);
    };

    /**
     * 选择下一个日期
     * @return {undefined}
     */


    DatePicker.prototype.handleDateSelect = function handleDateSelect(date) {
        this.setState({ date: this._productDate(date) });
    };

    /**
     * render函数
     * @return {Object} JSX对象
     */


    DatePicker.prototype.render = function render() {
        var _props = this.props;
        var layerBackground = _props.layerBackground;
        var btnColor = _props.btnColor;
        var touchLen = _props.touchLen;
        var dateColor = _props.dateColor;
        var _state = this.state;
        var date = _state.date;
        var minDate = _state.minDate;
        var maxDate = _state.maxDate;

        var datePickerStyle = {
            backgroundColor: layerBackground
        };

        return React__default.createElement(
            'div',
            {
                className: 'datepicker',
                style: datePickerStyle },
            React__default.createElement(
                'p',
                { className: 'datepicker-navbar' },
                React__default.createElement(
                    'span',
                    {
                        style: { color: btnColor },
                        className: 'datepicker-finish-btn',
                        onClick: this.handleFinishBtnClick },
                    '完成'
                )
            ),
            React__default.createElement(
                'div',
                { className: 'datepicker-content' },
                React__default.createElement(DatePickerItem, {
                    date: date,
                    typeName: 'Year',
                    minDate: minDate,
                    maxDate: maxDate,
                    touchLen: touchLen,
                    dateColor: dateColor,
                    onSelect: this.handleDateSelect }),
                React__default.createElement(DatePickerItem, {
                    date: date,
                    typeName: 'Month',
                    minDate: minDate,
                    maxDate: maxDate,
                    touchLen: touchLen,
                    dateColor: dateColor,
                    onSelect: this.handleDateSelect }),
                React__default.createElement(DatePickerItem, {
                    date: date,
                    typeName: 'Date',
                    minDate: minDate,
                    maxDate: maxDate,
                    touchLen: touchLen,
                    dateColor: dateColor,
                    onSelect: this.handleDateSelect })
            )
        );
    };

    return DatePicker;
}(React.Component);

DatePicker.propTypes = {
    touchLen: React.PropTypes.number,
    btnColor: React.PropTypes.string,
    dateColor: React.PropTypes.string,
    layerBackground: React.PropTypes.string,
    date: React.PropTypes.object,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    onSelect: React.PropTypes.func
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

    return React__default.createElement(
        'div',
        {
            style: { display: isOpen ? '' : 'none' },
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
    touchLen: React.PropTypes.number,
    btnColor: React.PropTypes.string,
    dateColor: React.PropTypes.string,
    layerBackground: React.PropTypes.string,
    date: React.PropTypes.object,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    onSelect: React.PropTypes.func
};

ModalDatePicker.defaultProps = {
    touchLen: 40,
    dateColor: '#fff',
    btnColor: '#fff',
    layerBackground: '#ffa70b',
    isOpen: false,
    date: new Date(),
    minDate: new Date(1970, 0, 1),
    maxDate: new Date(2050, 0, 1),
    onSelect: function () {}
};

return ModalDatePicker;

})));
//# sourceMappingURL=react-mobile-datepicker.js.map
