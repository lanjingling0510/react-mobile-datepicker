import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import DatePicker from '../lib/index.js';

const props = {
    value: new Date(),
    isPopup: false,
    theme: 'android'
};

const wrapStyle = {
    width: 375,
    height: 294,
    position: 'relative',
};

const getComponent = (options) => {
    return (
        <div style={wrapStyle}>
            <DatePicker {...props} {...options} />
        </div>
    );
};


storiesOf('Theme', module)
  .addWithInfo('default', () => getComponent({theme: 'default'}))
  .addWithInfo('dark', () => getComponent({theme: 'dark'}))
  .addWithInfo('ios', () => getComponent({theme: 'ios'}))
  .addWithInfo('android', () => getComponent({theme: 'android'}))
  .addWithInfo('android-dark', () => getComponent({theme: 'android-dark'}))

storiesOf('dateFormat', module)
  .addWithInfo('YYYY,MM,DD', () => getComponent())
  .addWithInfo('YYYY,MM,DD hh:mm', () => getComponent({dateFormat: ['YYYY', 'MM', 'DD', 'hh', 'mm'], showFormat: 'YYYY/MM/DD hh:mm'}))
  .addWithInfo('hh:mm:ss', () => getComponent({dateFormat: ['hh', 'mm', 'ss'], showFormat: 'hh:mm:ss'}))

storiesOf('dateLimit', module)
    .addWithInfo('min', () => getComponent({ min: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }))
    .addWithInfo('max', () => getComponent({ max: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) }))
