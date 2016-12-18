export function shallowEqual(prev, next) {
    if (prev === next) return true;
    const prevKeys = Object.keys(prev);
    const nextKeys = Object.keys(next);

    if (prevKeys.length !== nextKeys.length) return false;

    return prevKeys.every((key) => {
        return prev.hasOwnProperty(key) && prev[key] === next[key];
    });
}

function PureRender(Component) {
    Component.prototype.shouldComponentUpdate = function(nextProps, nextState) {
        return PureRender.shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    };
}

PureRender.shouldComponentUpdate = function (nextProps, nextState, preProps, preState) {
    return !shallowEqual(preProps, nextProps) || !shallowEqual(preState, nextState);
};

export default PureRender;
