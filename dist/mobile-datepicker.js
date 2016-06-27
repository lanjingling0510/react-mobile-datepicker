(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory(require("react"));
	else
		root["DatePicker"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(1);

	var _DatePicker = __webpack_require__(2);

	var _DatePicker2 = _interopRequireDefault(_DatePicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _DatePicker2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _time = __webpack_require__(4);

	var _transition = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module DatePicker组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	/**
	 * Class DatePicker组件类
	 * @extends Component
	 */

	var DatePicker = function (_Component) {
	    _inherits(DatePicker, _Component);

	    function DatePicker(props) {
	        _classCallCheck(this, DatePicker);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatePicker).call(this, props));

	        var dates = Array.apply(undefined, _toConsumableArray(Array(5))).map(function (value, index) {
	            var now = (0, _time.nextTime)(props.startDate, index - 2);
	            return {
	                name: (0, _time.getTimeName)(now),
	                value: now,
	                angle: (2 - index) * 22.5
	            };
	        });

	        _this.animating = false; // 判断是否在transition过渡动画之中
	        _this.touchY = 0; // 保存touchstart的pageY
	        _this.angle = 0; // 容器转过的角度
	        _this.state = {
	            angle: 0,
	            dates: dates
	        };

	        _this.handleFinishBtnClick = _this.handleFinishBtnClick.bind(_this);
	        _this.renderDatepickerItem = _this.renderDatepickerItem.bind(_this);
	        _this.handleContentTouch = _this.handleContentTouch.bind(_this);
	        _this.handleContentTransitionEnd = _this.handleContentTransitionEnd.bind(_this);
	        _this._moveToNext = _this._moveToNext.bind(_this);
	        return _this;
	    }

	    /**
	     * 根据角度返回透明度(0-1之间)
	     * @param {number} angle 角度
	     * @return
	     */


	    _createClass(DatePicker, [{
	        key: '_setOpacity',
	        value: function _setOpacity(angle) {
	            return angle > 0 ? ((40 - angle) / 40 * 100 | 0) / 100 : ((40 + angle) / 40 * 100 | 0) / 100;
	        }

	        /**
	         * 清除对象的transition样式
	         * @param  {Dom}     obj     指定的对象
	         * @return {undefined}
	         */

	    }, {
	        key: '_clearTransition',
	        value: function _clearTransition(obj) {
	            obj.style[_transition.TRANSITION] = ''; // eslint-disable-line
	        }

	        /**
	         * 滑动到下一日期
	         * @param  {number} direction 滑动方向
	         * @return {undefined}
	         */

	    }, {
	        key: '_moveToNext',
	        value: function _moveToNext(direction) {
	            var scroll = this.refs.scroll;
	            var angle = this.angle;
	            var _props = this.props;
	            var maxDate = _props.maxDate;
	            var minDate = _props.minDate;


	            var date = direction === 1 ? this.state.dates.find(function (value) {
	                return value.value.getTime() > (0, _time.nextTime)(maxDate, 0).getTime() && angle + direction * 22.5 + value.angle === 0;
	            }) : this.state.dates.find(function (value) {
	                return value.value.getTime() < (0, _time.nextTime)(minDate, 0).getTime() && angle + direction * 22.5 + value.angle === 0;
	            });
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

	    }, {
	        key: '_moveTo',
	        value: function _moveTo(obj, angle) {
	            this.animating = true;
	            obj.style[_transition.TRANSITION] = _transition.TRANSFORM_CSS + ' .2s ease-out'; // eslint-disable-line
	            this.setState({
	                angle: angle
	            });
	        }

	        /**
	         * 点击完成按钮事件
	         * @return {undefined}
	         */

	    }, {
	        key: 'handleFinishBtnClick',
	        value: function handleFinishBtnClick() {
	            var _this2 = this;

	            var date = this.state.dates.find(function (value) {
	                return value.angle + _this2.state.angle === 0;
	            });
	            this.props.onSelect(date.value);
	        }

	        /**
	         * 滑动日期选择器事件
	         * @param  {Object} event 事件对象
	         * @return {undefined}
	         */

	    }, {
	        key: 'handleContentTouch',
	        value: function handleContentTouch(event) {
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
	        }

	        /**
	         * transition过渡完成事件
	         * @return {undefined}
	         */

	    }, {
	        key: 'handleContentTransitionEnd',
	        value: function handleContentTransitionEnd() {
	            var _state = this.state;
	            var dates = _state.dates;
	            var angle = _state.angle;

	            var date = dates.find(function (value) {
	                return value.angle + angle === 0;
	            });
	            var newDates = Array.apply(undefined, _toConsumableArray(Array(5))).map(function (value, index) {
	                var now = (0, _time.nextTime)(date.value, index - 2);
	                return {
	                    name: (0, _time.getTimeName)(now),
	                    value: now,
	                    angle: (2 - index) * 22.5
	                };
	            });
	            this.animating = false;
	            this._clearTransition(this.refs.scroll);
	            this.setState({
	                dates: newDates,
	                angle: 0
	            });
	        }

	        /**
	         * 渲染一个日期DOM对象
	         * @param  {Object} date date数据
	         * @return {Object}      JSX对象
	         */

	    }, {
	        key: 'renderDatepickerItem',
	        value: function renderDatepickerItem(date) {
	            var _itemStyle;

	            var itemStyle = (_itemStyle = {}, _defineProperty(_itemStyle, _transition.TRANSFORM, 'rotateX(' + date.angle + 'deg) translate3d(0,0,100px)'), _defineProperty(_itemStyle, 'opacity', this._setOpacity(date.angle + this.state.angle)), _defineProperty(_itemStyle, 'color', this.props.dateColor), _itemStyle);
	            return _react2.default.createElement(
	                'li',
	                {
	                    key: date.value,
	                    style: itemStyle },
	                date.name
	            );
	        }

	        /**
	         * render函数
	         * @return {Object} JSX对象
	         */

	    }, {
	        key: 'render',
	        value: function render() {
	            var _props2 = this.props;
	            var layerBackground = _props2.layerBackground;
	            var btnColor = _props2.btnColor;

	            var scrollStyle = _defineProperty({}, _transition.TRANSFORM, 'rotateX(' + this.state.angle + 'deg)');

	            var datePickerStyle = {
	                backgroundColor: layerBackground
	            };

	            return _react2.default.createElement(
	                'div',
	                {
	                    className: 'datepicker',
	                    style: datePickerStyle },
	                _react2.default.createElement(
	                    'p',
	                    { className: 'datepicker-navbar' },
	                    _react2.default.createElement(
	                        'span',
	                        {
	                            style: { color: btnColor },
	                            className: 'datepicker-finish-btn',
	                            onClick: this.handleFinishBtnClick },
	                        '完成'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    {
	                        ref: 'parent',
	                        className: 'datepicker-content',
	                        onTouchStart: this.handleContentTouch,
	                        onTouchMove: this.handleContentTouch,
	                        onTouchEnd: this.handleContentTouch,
	                        onTransitionEnd: this.handleContentTransitionEnd },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'datepicker-viewport' },
	                        _react2.default.createElement(
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
	        }
	    }]);

	    return DatePicker;
	}(_react.Component);

	DatePicker.propTypes = {
	    touchLen: _react.PropTypes.number,
	    btnColor: _react.PropTypes.string,
	    dateColor: _react.PropTypes.string,
	    layerBackground: _react.PropTypes.string,
	    startDate: _react.PropTypes.object,
	    minDate: _react.PropTypes.object,
	    maxDate: _react.PropTypes.object,
	    onSelect: _react.PropTypes.func
	};

	DatePicker.defaultProps = {
	    touchLen: 40,
	    dateColor: '#fff',
	    btnColor: '#fff',
	    layerBackground: '#ffa70b',
	    startDate: (0, _time.nextTime)(new Date(), 0),
	    minDate: (0, _time.nextTime)(new Date(), -30),
	    maxDate: (0, _time.nextTime)(new Date(), 0),
	    onSelect: function onSelect() {}
	};

	exports.default = DatePicker;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.nextTime = nextTime;
	exports.getTimeName = getTimeName;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * @module time工具
	 */

	function convertDate(timestamp, formate) {
	    var date = new Date(timestamp);
	    var year = date.getFullYear();
	    var month = date.getMonth() + 1;
	    var day = date.getDate();
	    var hour = date.getHours();
	    var minute = date.getMinutes();
	    var second = date.getSeconds();

	    return formate.replace(/Y+/, year).replace(/M+/, month).replace(/D+/, day).replace(/h+/, hour).replace(/m+/, minute).replace(/s+/, second);
	}

	/**
	 * 获取相对日期的偏移日期
	 * @param  {Date}       日期
	 * @return {number}     相对的天数
	 */
	function nextTime() {
	    var now = arguments.length <= 0 || arguments[0] === undefined ? new Date() : arguments[0];
	    var index = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

	    if (Object.prototype.toString.call(now, null) !== '[object Date]') {
	        throw new Error('参数类型不对');
	    }

	    var date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	    date.setDate(now.getDate() + index);
	    return date;
	}

	/**
	 * 获取指定日期的格式化日期名称
	 * @param  {Date}     日期
	 * @return {String}   格式化日期名称
	 */
	function getTimeName(now) {
	    var _expection;

	    if (Object.prototype.toString.call(now, null) !== '[object Date]') {
	        throw new Error('参数类型不对');
	    }

	    var expection = (_expection = {}, _defineProperty(_expection, convertDate(new Date().getTime(), 'YYYY-MM-DD'), '今天'), _defineProperty(_expection, convertDate(nextTime(new Date(), -1).getTime(), 'YYYY-MM-DD'), '昨天'), _expection);

	    var timeStamp = now.getTime();
	    var result = convertDate(timeStamp, 'YYYY-MM-DD');

	    if (expection[result]) {
	        return expection[result];
	    }
	    return result;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var TRANSITION = null;
	var TRANSITIONEND = null;
	var TRANSITION_CSS = null;
	if (typeof document.body.style.transition === 'string') {
	    exports.TRANSITION = TRANSITION = 'transition';
	    exports.TRANSITIONEND = TRANSITIONEND = 'transitionend';
	    exports.TRANSITION_CSS = TRANSITION_CSS = 'transition';
	} else if (typeof document.body.style.webkitTransition === 'string') {
	    exports.TRANSITION = TRANSITION = 'WebkitTransition';
	    exports.TRANSITION_CSS = TRANSITION_CSS = '-webkit-transition';
	    exports.TRANSITIONEND = TRANSITIONEND = 'webkitTransitionEnd';
	}

	var TRANSFORM = null;
	var TRANSFORM_CSS = null;
	if (typeof document.body.style.transform === 'string') {
	    exports.TRANSFORM = TRANSFORM = 'transform';
	    exports.TRANSFORM_CSS = TRANSFORM_CSS = 'transform';
	} else if (typeof document.body.style.webkitTransform === 'string') {
	    exports.TRANSFORM = TRANSFORM = 'WebkitTransform';
	    exports.TRANSFORM_CSS = TRANSFORM_CSS = '-webkit-transform';
	}

	exports.TRANSITION = TRANSITION;
	exports.TRANSITIONEND = TRANSITIONEND;
	exports.TRANSITION_CSS = TRANSITION_CSS;
	exports.TRANSFORM = TRANSFORM;
	exports.TRANSFORM_CSS = TRANSFORM_CSS;

/***/ }
/******/ ])
});
;