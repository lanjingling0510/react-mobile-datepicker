import './index.css';
import React, { PropTypes } from 'react';
import DatePicker from './DatePicker.js';
import Modal from './Modal.js';


function EnhanceDatePicker({ isOpen, ...props }) {
    return (
        <div
            style={{ display: isOpen ? '' : 'none' }}
            className="datepicker-modal">
            <DatePicker {...props} />
        </div>
    );
}


function ModalDatePicker(props) {
    return (
        <Modal {...props}>
            <EnhanceDatePicker />
        </Modal>
    );
}

ModalDatePicker.propTypes = {
    isOpen: PropTypes.bool,
    touchLen: PropTypes.number,
    btnColor: PropTypes.string,
    dateColor: PropTypes.string,
    layerBackground: PropTypes.string,
    date: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    onSelect: PropTypes.func,
};

ModalDatePicker.defaultProps = {
    touchLen: 40,
    dateColor: '#fff',
    btnColor: '#fff',
    layerBackground: '#ffa70b',
    isOpen: false,
    date: new Date(),
    minDate: new Date(1970, 0, 1),
    maxDate: new Date(2050, 0, 1),
    onSelect: () => {},
};

export default ModalDatePicker;
