import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

type Props = {
    children: React.Element<*>,
    isOpen: boolean,
}

type DefaultProps = {
    isOpen: boolean,
}

class Modal extends Component<DefaultProps, Props, void> {

    static defaultProps = {
        isOpen: false,
    }

    componentDidMount() {
        this._div = document.createElement('div');
        this._div.classList.add('Modal-Portal');
        document.body.appendChild(this._div);
        this.renderPortal(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.renderPortal(newProps);
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this._div);
        this._div.parentNode.removeChild(this._div);
    }

    renderPortal(props) {
        const portal =
        React.cloneElement(this.props.children, { ...props, key: 'portal' }, null);

        this.portal =
        renderSubtreeIntoContainer(this, portal, this._div);
    }

    render() {
        return (<noscript / >);
    }
}

export default Modal;
