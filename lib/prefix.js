/**
 * 驼峰写法
 * @param  {String} str 要转化的字符串
 * @return {String}     转化后的字符串
 */
export function camelCase(str) {
    return str.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase()).replace('-', '');
}

/**
 * 格式化css属性对象
 * @param  {Object} props 属性对象
 * @return {Object}       添加前缀的格式化属性对象
 */
export function formatCss(props) {
    const prefixs = ['-webkit-', '-moz-', '-ms-'];

    const result = {};

    const regPrefix = /transform|transition/;


    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            const styleValue = props[key];

            // 如果检测是transform或transition属性
            if (regPrefix.test(key)) {
                for (let i = 0; i < prefixs.length; i++) {
                    const styleName = camelCase(prefixs[i] + key);
                    result[styleName] = styleValue.replace(regPrefix, `${prefixs[i]}$&`);
                }
            }

            result[key] = styleValue;
        }
    }

    return result;
}

/**
 * 为元素添加css样式
 * @param {Object} element 目标元素
 * @param {Object} props   css属性对象
 */
export function addPrefixCss(element, props) {
    const formatedProps = formatCss(props);
    for (const key in formatedProps) {
        if (formatedProps.hasOwnProperty(key)) {
            element.style[key] = formatedProps[key];
        }
    }
}
