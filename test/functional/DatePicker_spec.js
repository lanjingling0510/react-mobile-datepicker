
import React from 'react';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import DatePicker from '../../lib/DatePicker';
import DatePickerItem from '../../lib/DatePickerItem';
import {getTime, nextDate} from '../../lib/time';
import eventTrigger from '../event_helper.js';

configure({ adapter: new Adapter() });

const DEFAULT_PROPS = {
    value: new Date(2016, 8, 16),
    min: new Date(2015, 10, 1),
    max: new Date(2020, 10, 1),
    onChange: () => {},
    dateConfig: {
        'year': {
            format: 'YYYY',
            caption: 'Year',
            step: 1,
        },
        'month': {
            format: 'M',
            caption: 'Mon',
            step: 1,
        },
        'date': {
            format: 'D',
            caption: 'Day',
            step: 1,
        },
    },
    isOpen: true,
}

function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}

describe('DatePicker.js', () => {

    describe('Lifecycle', () => {
        it ('should update value of state when parent component value of props update', () => {
            const datePicker = mount(
                <DatePicker {...DEFAULT_PROPS} />
            );
            datePicker.setProps({ value: new Date(2016, 8, 15) });
            expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 8, 15).getTime());
        });
    });

    describe('logic', () => {
        var datePicker;
        var yearPicker;
        var monthPicker;
        var dayPicker;

        before(function() {
            datePicker = mount(
                <DatePicker {...DEFAULT_PROPS} />
            );
            yearPicker = datePicker.find(DatePickerItem).first();
            monthPicker = datePicker.find(DatePickerItem).at(1);
            dayPicker = datePicker.find(DatePickerItem).at(2);
        });

        it ('should update correct value of state, when slide to next year, month, date', () => {
            const touchstartEvent = {
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                targetTouches: [{ pageY: -21 }],
            };
            const touchendEvent = {
                changedTouches: [{ pageY: -21 }],
            };

            const year = yearPicker.find('.datepicker-viewport').instance();

            eventTrigger(year, 'touchstart',  touchstartEvent);
            eventTrigger(year, 'touchmove', touchmoveEvent);
            eventTrigger(year, 'touchend', touchendEvent);

            return delay(250)
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2017, 8, 16).getTime());

                const month = monthPicker.find('.datepicker-viewport').instance();

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2017, 9, 16).getTime());

                const day = dayPicker.find('.datepicker-viewport').instance();

                eventTrigger(day, 'touchstart',  touchstartEvent);
                eventTrigger(day, 'touchmove', touchmoveEvent);
                eventTrigger(day, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2017, 9, 17).getTime());
                // Special case
                datePicker.setState({value: new Date(2016, 9, 31)});

                const month = monthPicker.find('.datepicker-viewport').instance();

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 10, 30).getTime());

                const day = dayPicker.find('.datepicker-viewport').instance();

                eventTrigger(day, 'touchstart',  touchstartEvent);
                eventTrigger(day, 'touchmove', touchmoveEvent);
                eventTrigger(day, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 11, 1).getTime());
            });
        })



        it ('should update correct value of state, when slide to last year, month, date', () => {
            const touchstartEvent = {
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                targetTouches: [{ pageY: 21 }],
            };
            const touchendEvent = {
                changedTouches: [{ pageY: 21 }],
            };

            datePicker.setState({value: new Date(2016, 8, 16)});

            const year = yearPicker.find('.datepicker-viewport').instance();

            eventTrigger(year, 'touchstart',  touchstartEvent);
            eventTrigger(year, 'touchmove', touchmoveEvent);
            eventTrigger(year, 'touchend', touchendEvent);

            return delay(250)
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 8, 16).getTime());

                const month = monthPicker.find('.datepicker-viewport').instance();

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 7, 16).getTime());

                const day = dayPicker.find('.datepicker-viewport').instance();

                eventTrigger(day, 'touchstart',  touchstartEvent);
                eventTrigger(day, 'touchmove', touchmoveEvent);
                eventTrigger(day, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 7, 15).getTime());
                // Special case
                datePicker.setState({value: new Date(2016, 10, 30)});

                const month = monthPicker.find('.datepicker-viewport').instance();

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);

                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2016, 9, 30).getTime());
            });
        })


        it('should not update value of state, when less than the minimum', () => {
            datePicker.setState({value: new Date(2016, 11, 2)});
            const touchstartEvent = {
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                targetTouches: [{ pageY: 50 }],
            };
            const touchendEvent = {
                changedTouches: [{ pageY: 50 }],
            };


            const year = yearPicker.find('.datepicker-viewport').instance();

            eventTrigger(year, 'touchstart',  touchstartEvent);
            eventTrigger(year, 'touchmove', touchmoveEvent);
            eventTrigger(year, 'touchend', touchendEvent);

            return delay(250)
            .then(() => {
                const month = monthPicker.find('.datepicker-viewport').instance();

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);
                return delay(250);
            })
            .then(() => {
                const day = dayPicker.find('.datepicker-viewport').instance();

                eventTrigger(day, 'touchstart',  touchstartEvent);
                eventTrigger(day, 'touchmove', touchmoveEvent);
                eventTrigger(day, 'touchend', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2015, 10, 1).getTime());
            });
        })

        it('should not update value of state, when more than the maximum', () => {
            datePicker.setState({value: new Date(2019, 9, 31)});
            const touchstartEvent = {
                targetTouches: [{ pageY: 0 }],
            };
            const touchmoveEvent = {
                targetTouches: [{ pageY: -50 }],
            };
            const touchendEvent = {
                changedTouches: [{ pageY: -50 }],
            };

            const year = yearPicker.find('.datepicker-viewport').instance();

            eventTrigger(year, 'touchstart',  touchstartEvent);
            eventTrigger(year, 'touchmove', touchmoveEvent);
            eventTrigger(year, 'touchend', touchendEvent);

            return delay(250)
            .then(() => {
                const month = monthPicker.find('.datepicker-viewport').instance();

                eventTrigger(month, 'touchstart',  touchstartEvent);
                eventTrigger(month, 'touchmove', touchmoveEvent);
                eventTrigger(month, 'touchend', touchendEvent);
                return delay(250);
            })
            .then(() => {
                const day = dayPicker.find('.datepicker-viewport').instance();

                eventTrigger(day, 'touchstart',  touchstartEvent);
                eventTrigger(day, 'touchmove', touchmoveEvent);
                eventTrigger(day, 'touchend', touchendEvent);
                return delay(250);
            })
            .then(() => {
                expect(datePicker.state('value').getTime()).to.equals(new Date(2020, 10, 1).getTime());
            });
        })
    });
});

describe('渲染正确的DatepicketItem子组件', () => {
    let props;
    let mountedDatepicker;

    const datePicker = () => {
        if (!mountedDatepicker) {
            mountedDatepicker = mount(
                <DatePicker {...props} />
            );
        }

        return mountedDatepicker;
    }

    beforeEach(() => {
        props = {
            value: new Date(2016, 8, 16),
        };
        mountedDatepicker = undefined;
    });

    it('当dateFormat等于[YYYY, MM, DD]', () => {
        props.dateConfig = {
            'year': {
                format: 'YYYY',
            },
            'month': {
                format: 'MM',
            },
            'date': {
                format: 'DD',
            },
        };
        const datePickerItems = datePicker().find(DatePickerItem);
        expect(datePickerItems.length).to.equals(3);
        expect(datePickerItems.at(0).props().format).to.equals('YYYY');
        expect(datePickerItems.at(1).props().format).to.equals('MM');
        expect(datePickerItems.at(2).props().format).to.equals('DD');
    });

    it('当dateFormat等于[YYYY, MM, DD, hh, mm, ss]', () => {
        props.dateConfig = {
            'year': {
                format: 'YYYY',
            },
            'month': {
                format: 'MM',
            },
            'date': {
                format: 'DD',
            },
            'hour': {
                format: 'hh',
            },
            'minute': {
                format: 'mm',
            },
            'second': {
                format: 'ss',
            },
        };
        const datePickerItems = datePicker().find(DatePickerItem);
        expect(datePickerItems.length).to.equals(6);
        expect(datePickerItems.at(0).props().format).to.equals('YYYY');
        expect(datePickerItems.at(1).props().format).to.equals('MM');
        expect(datePickerItems.at(2).props().format).to.equals('DD');
        expect(datePickerItems.at(3).props().format).to.equals('hh');
        expect(datePickerItems.at(4).props().format).to.equals('mm');
        expect(datePickerItems.at(5).props().format).to.equals('ss');
    });

    it('当dateFormat等于[hh, mm, ss]', () => {
        props.dateConfig = {
            'hour': {
                format: 'hh',
            },
            'minute': {
                format: 'mm',
            },
            'second': {
                format: 'ss',
            },
        };
        const datePickerItems = datePicker().find(DatePickerItem);
        expect(datePickerItems.length).to.equals(3);
        expect(datePickerItems.at(0).props().format).to.equals('hh');
        expect(datePickerItems.at(1).props().format).to.equals('mm');
        expect(datePickerItems.at(2).props().format).to.equals('ss');
    });
});

describe('测试step', () => {
    let props;
    let mountedDatepicker;
    let yearPicker, monthPicker, dayPicker;

    const datePicker = () => {
        if (!mountedDatepicker) {
            mountedDatepicker = mount(
                <DatePicker {...props} />
            );

            yearPicker = mountedDatepicker.find(DatePickerItem).first();
            monthPicker = mountedDatepicker.find(DatePickerItem).at(1);
            dayPicker = mountedDatepicker.find(DatePickerItem).at(2);
        }

        return mountedDatepicker;
    }

    beforeEach(() => {
        props = {
            value: new Date(2016, 8, 16, 8, 22, 57),
            min: new Date(2015, 10, 1),
            max: new Date(2020, 10, 1),
            isOpen: true,
            onChange: () => {},
        };
        mountedDatepicker = undefined;
        yearPicker = null;
        monthPicker = null;
        dayPicker = null;
    });


    it ('当datesteps等于[5, 5, 5], dateFormart等于[hh, mm, ss], 当前时间为8:20:57，向上滑动秒，分钟应该为23', () => {
        props.dateConfig = {
            'hour': {
                format: 'hh',
                step: 1,
            },
            'minute': {
                format: 'mm',
                step: 1,
            },
            'second': {
                format: 'ss',
                step: 5,
            },
        };

        const datePickerItems = datePicker().find(DatePickerItem);
        const second = dayPicker.find('.datepicker-viewport').instance();

        const touchstartEvent = {
            targetTouches: [{ pageY: 0 }],
        };
        const touchmoveEvent = {
            targetTouches: [{ pageY: -21 }],
        };
        const touchendEvent = {
            changedTouches: [{ pageY: -21 }],
        };

        eventTrigger(second, 'touchstart',  touchstartEvent);
        eventTrigger(second, 'touchmove', touchmoveEvent);
        eventTrigger(second, 'touchend', touchendEvent);

        return delay(250)
        .then(() => {
            expect(mountedDatepicker.state('value').getTime()).to.equals(new Date(2016, 8, 16, 8, 23, 2).getTime());
        })
    });


    it ('当datesteps等于[5, 5, 5], dateFormart等于[hh, mm, ss], 当前时间为8:20:57，向上滑动秒，最大时间是8:20:59, 分钟应该为22', () => {
        props.dateConfig = {
            'hour': {
                format: 'hh',
                step: 1,
            },
            'minute': {
                format: 'mm',
                step: 1,
            },
            'second': {
                format: 'ss',
                step: 5,
            },
        };

        props.max = new Date(2016, 8, 16, 8, 22, 59);

        const datePickerItems = datePicker().find(DatePickerItem);
        const second = dayPicker.find('.datepicker-viewport').instance();

        const touchstartEvent = {
            targetTouches: [{ pageY: 0 }],
        };
        const touchmoveEvent = {
            targetTouches: [{ pageY: -21 }],
        };
        const touchendEvent = {
            changedTouches: [{ pageY: -21 }],
        };

        eventTrigger(second, 'touchstart',  touchstartEvent);
        eventTrigger(second, 'touchmove', touchmoveEvent);
        eventTrigger(second, 'touchend', touchendEvent);

        return delay(250)
        .then(() => {
            expect(mountedDatepicker.state('value').getTime()).to.equals(new Date(2016, 8, 16, 8, 22, 57).getTime());
        })
    });
});


describe('测试showCaption属性', () => {
    let props;
    let mountedDatepicker;

    const datePicker = () => {
        if (!mountedDatepicker) {
            mountedDatepicker = mount(
                <DatePicker {...props} />
            );
        }

        return mountedDatepicker;
    }

    beforeEach(() => {
        props = {
            value: new Date(2016, 8, 16, 8, 22, 57),
            isOpen: true,
        };
        mountedDatepicker = undefined;
    });

    it ('不显示说明', () => {
        const wrapper = datePicker();
        expect(wrapper.find('.datepicker-caption'))
        expect(wrapper.find('.datepicker-caption')).to.have.lengthOf(0);
    });
    it ('显示说明', () => {
        props.showCaption = true;
        props.dateConfig = {
            'month': {
                format: 'M',
                caption: 'Month',
                step: 1,
            },
            'date': {
                format: 'D',
                caption: 'Day',
                step: 1,
            },
            'hour': {
                format: 'hh',
                caption: 'Hour',
                step: 1,
            },
        };
        const wrapper = datePicker();
        expect(wrapper.find('.datepicker-caption').text()).to.be.equal('MonthDayHour');
    });
})