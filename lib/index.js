import './index.css';
import React, { PropTypes } from 'react';
import DatePicker from './DatePicker.js';
import Modal from './Modal.js';


function EnhanceDatePicker({ isOpen, ...props }) {
    function onModalClose(event) {
        if (event.target === event.currentTarget) {
            props.onCancel();
        }
    }

    return (
        <div
            style={{ display: isOpen ? '' : 'none' }}
            onClick={onModalClose}
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
    theme: PropTypes.string,
    value: PropTypes.object,
    min: PropTypes.object,
    max: PropTypes.object,
    dateFormat: PropTypes.array,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
};

ModalDatePicker.defaultProps = {
    isOpen: false,
    theme: 'default',
    value: new Date(),
    min: new Date(1970, 0, 1),
    max: new Date(2050, 0, 1),
    dateFormat: ['YYYY', 'M', 'D'],
    onSelect: () => {},
    onCancel: () => {},
};

export default ModalDatePicker;
