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

	var _DatePickerItem = __webpack_require__(4);

	var _DatePickerItem2 = _interopRequireDefault(_DatePickerItem);

	var _time = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	        // 容器转过的角度

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatePicker).call(this, props));

	        _this.state = {
	            date: _this._productDate(props.date),
	            minDate: _this._productDate(props.minDate),
	            maxDate: _this._productDate(props.maxDate)
	        };

	        _this.handleFinishBtnClick = _this.handleFinishBtnClick.bind(_this);
	        _this.handleDateSelect = _this.handleDateSelect.bind(_this);
	        return _this;
	    }

	    _createClass(DatePicker, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                date: this._productDate(nextProps.date),
	                minDate: this._productDate(nextProps.minDate),
	                maxDate: this._productDate(nextProps.maxDate)
	            });
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            return nextState.date.timestamp !== this.state.date.timestamp || nextProps.date !== this.props.date || nextProps.minDate !== this.props.minDate || nextProps.maxDate !== this.props.maxDate;
	        }
	    }, {
	        key: '_productDate',
	        value: function _productDate(date) {
	            var nDate = (0, _time.nextDate)(date, 0);
	            return {
	                value: nDate,
	                timestamp: nDate.getTime(),
	                Year: (0, _time.getTime)(nDate, 'Year'),
	                Month: (0, _time.getTime)(nDate, 'Month'),
	                Date: (0, _time.getTime)(nDate, 'Date')
	            };
	        }

	        /**
	         * 点击完成按钮事件
	         * @return {undefined}
	         */

	    }, {
	        key: 'handleFinishBtnClick',
	        value: function handleFinishBtnClick() {
	            this.props.onSelect(this.state.date.value);
	        }

	        /**
	         * 选择下一个日期
	         * @return {undefined}
	         */

	    }, {
	        key: 'handleDateSelect',
	        value: function handleDateSelect(date) {
	            this.setState({ date: this._productDate(date) });
	        }

	        /**
	         * render函数
	         * @return {Object} JSX对象
	         */

	    }, {
	        key: 'render',
	        value: function render() {
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
	                    { className: 'datepicker-content' },
	                    _react2.default.createElement(_DatePickerItem2.default, {
	                        date: date,
	                        typeName: 'Year',
	                        minDate: minDate,
	                        maxDate: maxDate,
	                        touchLen: touchLen,
	                        dateColor: dateColor,
	                        onSelect: this.handleDateSelect }),
	                    _react2.default.createElement(_DatePickerItem2.default, {
	                        date: date,
	                        typeName: 'Month',
	                        minDate: minDate,
	                        maxDate: maxDate,
	                        touchLen: touchLen,
	                        dateColor: dateColor,
	                        onSelect: this.handleDateSelect }),
	                    _react2.default.createElement(_DatePickerItem2.default, {
	                        date: date,
	                        typeName: 'Date',
	                        minDate: minDate,
	                        maxDate: maxDate,
	                        touchLen: touchLen,
	                        dateColor: dateColor,
	                        onSelect: this.handleDateSelect })
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
	    date: _react.PropTypes.object,
	    minDate: _react.PropTypes.object,
	    maxDate: _react.PropTypes.object,
	    onSelect: _react.PropTypes.func
	};

	DatePicker.defaultProps = {
	    touchLen: 40,
	    dateColor: '#fff',
	    btnColor: '#fff',
	    layerBackground: '#ffa70b',
	    date: new Date(),
	    minDate: new Date(1970, 0, 1),
	    maxDate: new Date(2050, 0, 1),
	    onSelect: function onSelect() {}
	};

	exports.default = DatePicker;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _time = __webpack_require__(5);

	var TimeUtil = _interopRequireWildcard(_time);

	var _transition = __webpack_require__(6);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/**
	 * @module Date组件
	 */


	/**
	 * Class Date组件类
	 * @extends Component
	 */

	var DatePickerItem = function (_Component) {
	    _inherits(DatePickerItem, _Component);

	    function DatePickerItem(props) {
	        _classCallCheck(this, DatePickerItem);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatePickerItem).call(this, props));

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

	    _createClass(DatePickerItem, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _this2 = this;

	            var dates = Array.apply(undefined, _toConsumableArray(Array(5))).map(function (value, index) {
	                var date = TimeUtil['next' + _this2.props.typeName](_this2.props.date.value, index - 2);
	                return _extends({}, TimeUtil.getTime(date, _this2.props.typeName), {
	                    angle: (2 - index) * 22.5
	                });
	            });
	            this.setState({ dates: dates });
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
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
	        }

	        /**
	         * 根据角度返回透明度(0-1之间)
	         * @param {number} angle 角度
	         * @return
	         */

	    }, {
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
	            obj.style[_transition.TRANSITION] = 'all .2s ease-out'; // eslint-disable-line
	            this.setState({
	                angle: angle
	            });
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
	            var _this3 = this;

	            var date = this.props.date;
	            var newDates = Array.apply(undefined, _toConsumableArray(Array(5))).map(function (value, index) {
	                var now = TimeUtil['next' + _this3.props.typeName](date.value, index - 2);
	                return _extends({}, TimeUtil.getTime(now, _this3.props.typeName), {
	                    angle: (2 - index) * 22.5
	                });
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
	        value: function renderDatepickerItem(date, index) {
	            var _itemStyle;

	            var itemStyle = (_itemStyle = {}, _defineProperty(_itemStyle, _transition.TRANSFORM, 'rotateX(' + date.angle + 'deg) translate3d(0,0,100px)'), _defineProperty(_itemStyle, 'opacity', this._setOpacity(date.angle + this.state.angle)), _defineProperty(_itemStyle, 'color', this.props.dateColor), _itemStyle);
	            return _react2.default.createElement(
	                'li',
	                {
	                    key: index,
	                    style: itemStyle },
	                date.value,
	                date.suffix
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var scrollStyle = _defineProperty({}, _transition.TRANSFORM, 'rotateX(' + this.state.angle + 'deg)');

	            return _react2.default.createElement(
	                'div',
	                {
	                    className: 'datepicker-viewport',
	                    onTouchStart: this.handleContentTouch,
	                    onTouchMove: this.handleContentTouch,
	                    onTouchEnd: this.handleContentTouch,
	                    onTransitionEnd: this.handleContentTransitionEnd },
	                _react2.default.createElement(
	                    'ul',
	                    {
	                        ref: 'scroll',
	                        className: 'datepicker-scroll',
	                        style: scrollStyle },
	                    this.state.dates.map(this.renderDatepickerItem)
	                )
	            );
	        }
	    }]);

	    return DatePickerItem;
	}(_react.Component);

	DatePickerItem.propTypes = {
	    date: _react.PropTypes.object.isRequired,
	    minDate: _react.PropTypes.object.isRequired,
	    maxDate: _react.PropTypes.object.isRequired,
	    typeName: _react.PropTypes.string.isRequired,
	    touchLen: _react.PropTypes.number,
	    dateColor: _react.PropTypes.string,
	    onSelect: _react.PropTypes.func
	};

	DatePickerItem.defaultProps = {
	    dateColor: '#fff',
	    touchLen: 40,
	    onSelect: function onSelect() {}
	};

	exports.default = DatePickerItem;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.nextYear = nextYear;
	exports.nextMonth = nextMonth;
	exports.nextDate = nextDate;
	exports.getTime = getTime;
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

/***/ },
/* 6 */
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