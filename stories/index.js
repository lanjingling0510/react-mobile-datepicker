import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import DatePicker from '../lib/index.js';
import './index.css';

const props = {
    value: new Date(),
    isPopup: false,
    theme: 'android'
};

const getComponent = (options) => {
    return (
        <DatePicker {...props} {...options} />
    );
};


storiesOf('Theme', module)
  .addWithInfo('default', () => getComponent({theme: 'default'}))
  .addWithInfo('dark', () => getComponent({theme: 'dark'}))
  .addWithInfo('ios', () => getComponent({theme: 'ios'}))
  .addWithInfo('android', () => getComponent({theme: 'android'}))
  .addWithInfo('android-dark', () => getComponent({theme: 'android-dark'}))


  const dateConfigMap = {
    'year': {
        format: 'YYYY',
        caption: '年',
        step: 1,
    },
    'month': {
        format: 'M',
        caption: '月',
        step: 1,
    },
    'date': {
        format: 'D',
        caption: '日',
        step: 1,
    },
    'hour': {
        format: 'hh',
        caption: '时',
        step: 1,
    },
    'minute': {
        format: 'mm',
        caption: '分',
        step: 1,
    },
    'second': {
        format: 'hh',
        caption: '秒',
        step: 1,
    },
};

storiesOf('dateConfig', module)
  .addWithInfo('YYYY,MM,DD', () => getComponent())
  .addWithInfo('YYYY,MM,DD hh:mm', () => getComponent({dateConfig: dateConfigMap, showFormat: 'YYYY/MM/DD hh:mm'}))
  .addWithInfo('hh:mm:ss', () => getComponent({dateConfig: ['hour', 'minute', 'second'], showFormat: 'hh:mm:ss'}))

storiesOf('dateLimit', module)
    .addWithInfo('min', () => getComponent({ min: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }))
    .addWithInfo('max', () => getComponent({ max: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) }))

storiesOf('dateCaption', module)
    .addWithInfo('default caption', () => getComponent({dateConfig: ['year', 'month', 'date', 'hour', 'minute', 'second'], showCaption: true}))
    .addWithInfo('custom caption', () => getComponent({dateConfig: dateConfigMap, showCaption: true}))