/**
 * @module time工具
 */

function throwIfInvalidDate(date) {
    if (Object.prototype.toString.call(date, null) !== '[object Date]') {
        throw new Error('参数类型不对');
    }
}

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * @param  {Date}       日期
 * @return {String}     字符串格式
 */
export function convertDate(date, format) {
    let str = format;
    const o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    if (/(Y+)/.test(format)) {
        str = str.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length));
    }

    for (const k in o) {
        // eslint-disable-line
        if (new RegExp(`(${k})`).test(format)) {
            str = str.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(o[k].toString().length),
            );
        }
    }

    return str;
}

/**
 * 获取相对日期的偏移日期
 * @param  {Date}       日期
 * @return {number}     相对的天数
 */
export function nextYear(now, index = 0, relative = true) {
    throwIfInvalidDate(now);
    const date = new Date(
        now.getFullYear() + index,
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
    );
    return date;
}

export function nextMonth(now, index = 0, relative = true) {
    throwIfInvalidDate(now);
    if (!relative) {
        return new Date(
            now.getFullYear(),
            (now.getMonth() + 12 + index) % 12,
            now.getDate(),
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
        )
    }
    const year = now.getFullYear();
    const month = now.getMonth() + index;
    const dayOfMonth = Math.min(now.getDate(), daysInMonth(year, month));
    const date = new Date(
        year,
        month,
        dayOfMonth,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
    );
    return date;
}

export function nextDate(now, index = 0, relative = true) {
    throwIfInvalidDate(now);
    if (!relative) {
        const year = now.getFullYear();
        const month = now.getMonth();
        const maxDayInMonth = daysInMonth(year, month);
        const day = (now.getDate() - 1 + maxDayInMonth + index) % maxDayInMonth + 1;
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            day,
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
        )
    }
    const date = new Date(now.getTime() + index * 24 * 60 * 60 * 1000);
    return date;
}

export function nextHour(now, index = 0, relative = true) {
    throwIfInvalidDate(now);
    if (!relative) {
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            (now.getHours() + 24 + index) % 24,
            now.getMinutes(),
            now.getSeconds(),
        )
    }
    const date = new Date(now.getTime() + index * 60 * 60 * 1000);
    return date;
}

export function nextMinute(now, index = 0, relative = true) {
    throwIfInvalidDate(now);
    if (!relative) {
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            (now.getMinutes() + 60 + index) % 60,
            now.getSeconds(),
        )
    }
    const date = new Date(now.getTime() + index * 60 * 1000);
    return date;
}

export function nextSecond(now, index = 0, relative = true) {
    console.log(relative);
    throwIfInvalidDate(now);
    if (!relative) {
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes(),
            (now.getSeconds() + 60 + index) % 60,
        )
    }
    const date = new Date(now.getTime() + index * 1000);
    return date;
}
