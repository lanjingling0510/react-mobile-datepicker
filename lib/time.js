/**
 * @module time工具
 */

function convertDate(timestamp, formate) {
    const date = new Date(timestamp);
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

/**
 * 获取相对日期的偏移日期
 * @param  {Date}       日期
 * @return {number}     相对的天数
 */
export function nextTime(now = new Date(), index = 1) {
    if (Object.prototype.toString.call(now, null) !== '[object Date]') {
        throw new Error('参数类型不对');
    }

    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    date.setDate(now.getDate() + index);
    return date;
}

/**
 * 获取指定日期的格式化日期名称
 * @param  {Date}     日期
 * @return {String}   格式化日期名称
 */
export function getTimeName(now) {
    if (Object.prototype.toString.call(now, null) !== '[object Date]') {
        throw new Error('参数类型不对');
    }

    const expection = {
        [convertDate(new Date().getTime(), 'YYYY-MM-DD')]: '今天',
        [convertDate(nextTime(new Date(), -1).getTime(), 'YYYY-MM-DD')]: '昨天',
    };

    const timeStamp = now.getTime();
    const result = convertDate(timeStamp, 'YYYY-MM-DD');

    if (expection[result]) {
        return expection[result];
    }
    return result;
}
