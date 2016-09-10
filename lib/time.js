/**
 * @module time工具
 */

export function convertDate(date, formate) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return formate
         .replace(/Y+/, year)
         .replace(/M+/, month)
         .replace(/D+/, day)
         .replace(/h+/, hour)
         .replace(/m+/, minute)
         .replace(/s+/, second);
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
export function nextYear(now, index = 0) {
    throwIfInvalidDate(now);
    const date = new Date(now.getFullYear() + index, now.getMonth(), now.getDate());
    return date;
}

export function nextMonth(now, index = 0) {
    throwIfInvalidDate(now);
    const date = new Date(now.getFullYear(), now.getMonth() + index, now.getDate());
    return date;
}

export function nextDate(now, index = 0) {
    throwIfInvalidDate(now);
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + index);
    return date;
}


/**
 * 获取指定日期年，月或日
 * @param  {Date}     日期
 * @return {String}   格式化日期名称
 */
export function getTime(date, type) {
    throwIfInvalidDate(date);
    const units = {
        Year: ['YYYY', '年'],
        Month: ['MM', '月'],
        Date: ['DD', '日'],
    };

    if (!units[type]) throw new Error('类型不对');

    const result = {
        value: parseInt(convertDate(date, units[type][0]), 10),
        suffix: units[type][1],
    };
    return result;
}
