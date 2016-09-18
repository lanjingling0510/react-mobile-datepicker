# react-mobile-datepicker
[![Travis][build-badge]][build] [![npm package][npm-badge]][npm] [![Coveralls][coveralls-badge]][coveralls]


**a  lightweight react date picker for mobile, Not more than 4k**

react-mobile-datepicker provides a component that can set year, month and day by sliding up or down.

## Features

- is only 4k.
- It does not depend on moment.js


<div style="padding:30px">
<img src="https://raw.githubusercontent.com/lanjingling0510/react-mobile-datepicker/master/.github/preview2.gif" width="300" />
</div>




## Getting Started

### Install

Using [npm](https://www.npmjs.com/):

	$ npm install react-mobile-datepicker --save

### Import what you need
The following guide assumes you have some sort of ES2015 build set up using babel and/or webpack/browserify/gulp/grunt/etc.


```js
// Using an ES6 transpiler like Babel
import  React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-mobile-datepicker';
```


### Usage Example


```js
class App extends React.Component {
	state = {
		time: new Date(),
		isOpen: false,
	}

	handleClick = () => {
		this.setState({ isOpen: true });
	}

	handleCancel = () => {
		this.setState({ isOpen: false });
	}

	handleSelect = (time) => {
		this.setState({ time, isOpen: false });
	}

	render() {
		return (
			<div className="App">
				<a
					className="select-btn"
					onClick={this.handleClick}>
					select time
				</a>
				<p className="select-time ">
					{this.state.time}
				</p>

				<DatePicker
					value={this.state.time}
					isOpen={this.state.isOpen}
					onSelect={this.handleSelect}
					onCancel={this.handleCancel} />
			</div>
		);
	}
}


ReactDOM.render(<App />, document.getElementById('react-box'));
```


## PropTypes

| Property        | Type           | Default  | Description |
|:------------- |:------------- |:-------------- |:---------- |
| isOpen      | Boolean | false | whether to open datepicker |
| theme      | String      | default  | theme of datepicker, include 'default', 'dark', 'ios', 'android', 'android-dark' |
| dateFormat | Array     | ['YYYY', 'M', 'D'] | according to year, month, day format specified display text. E.g ['YYYY年', 'MM月', 'DD日']|
| value | Date | new Date() | date value |
| min  | Date | new Date(1970, 0, 1) | minimum date |
| max | Date | new Date(2050, 0, 1) | maximum date |
| onSelect | Function | () => {} | the callback function after click button of done, Date object as a parameter |
| onCancel | Function | () => {} | the callback function after click button of cancel |

## Changelog
* [Changelog](CHANGELOG.md)

## How to Contribute

Anyone and everyone is welcome to contribute to this project. The best way to
start is by checking our [open issues](https://github.com/lanjingling0510/react-mobile-datepicker/issues),
[submit a new issues](https://github.com/lanjingling0510/react-mobile-datepicker/issues/new?labels=bug) or
[feature request](https://github.com/lanjingling0510/react-mobile-datepicker/issues/new?labels=enhancement),
participate in discussions, upvote or downvote the issues you like or dislike.




[npm-badge]: https://img.shields.io/npm/v/react-mobile-datepicker.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-mobile-datepicker
[build-badge]: https://img.shields.io/travis/lanjingling0510/react-mobile-datepicker/master.svg?style=flat-square
[build]: https://travis-ci.org/lanjingling0510/react-mobile-datepicker
[coveralls-badge]: https://img.shields.io/coveralls/lanjingling0510/react-mobile-datepicker.svg?style=flat-square
[coveralls]: https://coveralls.io/github/lanjingling0510/react-mobile-datepicker
