# react-mobile-datepicker
[![Travis][build-badge]][build] [![npm package][npm-badge]][npm] [![Coveralls][coveralls-badge]][coveralls]

一个移动端时间选择器react组件
---------------------------------------

<div style="padding:30px">
<img src="https://raw.githubusercontent.com/lanjingling0510/react-mobile-datepicker/master/.github/preview.gif" width="300" />
</div>



安装
------------
Using [npm](https://www.npmjs.com/):

	$ npm install react-mobile-datepicker --save


然后，使用模块加载工具流，支持common.js或ES2015模块,例如[webpack](https://github.com/webpack/webpack)

```js
// Using an ES6 transpiler like Babel
import DatePicker from 'react-mobile-datepicker';
import 'react-mobile-datepicker/dist/mobile-datepicker.css'; // Make sure to import the default stylesheet

// Not using an ES6 transpiler
var DatePicker = require('react-mobile-datepicker');
require('react-mobile-datepicker/dist/mobile-datepicker.css');
```

使用
------------
### 例子

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import DatePicker from 'mobile-datepicker';
import 'react-mobile-datepicker/dist/mobile-datepicker.css'; // only needs to be imported once

// Render the Calendar
var today = new Date();
var minDate = Number(new Date()) - (24*60*60*1000) * 7; // One week before today



render(
	<DatePicker
		startDate={today}
		minDate={minDate}
		onSelect={(time) => { console.log(time); }} />,
  document.getElementById('root')
);
```


Prop Types
------------

| Property        | Type           | Default  | Description |
|:------------- |:------------- |:-------------- |:---------- |
| btnColor      | String | #fff | 完成按钮颜色 |
| dateColor      | String      | #fff  | 日期文字颜色 |
| layerBackground | String     | #ffa70b | 背景颜色 |
| startDate | Date | new Date() | 初始日期 |
| minDate  | Date | 前一周 | 最小日期 |
| maxDate  | Date | new Date() | 最大日期 |
| onSelect | Function | () => {} | 点击完成后的回调函数, Date对象作为参数 |

Changelog
-------------

v1.0.3 - Thu, 23 Jun 2016 13:22:13 GMT
--------------------------------------

- [5a93fe9](../../commit/5a93fe9) [changed] 更新了READEME





[npm-badge]: https://img.shields.io/npm/v/react-mobile-datepicker.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-mobile-datepicker
[build-badge]: https://img.shields.io/travis/lanjingling0510/react-mobile-datepicker/master.svg?style=flat-square
[build]: https://travis-ci.org/lanjingling0510/react-mobile-datepicker
[coveralls-badge]: https://img.shields.io/coveralls/lanjingling0510/react-mobile-datepicker.svg?style=flat-square
[coveralls]: https://coveralls.io/github/lanjingling0510/react-mobile-datepicker
