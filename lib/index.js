import './index.css';
import React from 'react';
import DatePicker from './DatePicker.js';
import Modal from './Modal.js';
import {defaultProps} from './dataSource';

type EnhanceDatePickerProps<T> = T & {
    isOpen: boolean,
}

function EnhanceDatePicker<T: *>({ isOpen, ...props }: EnhanceDatePickerProps<T>) {
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

type ModalDatePickerProps<T> = T & {
    isPopup: boolean,
}

function ModalDatePicker<T: *>({ isPopup, ...props }: ModalDatePickerProps<T>) {
    if (!isPopup) {
        return <DatePicker {...props} />;
    }

    return (
        <Modal {...props}>
            <EnhanceDatePicker />
        </Modal>
    );
}

ModalDatePicker.displayName = 'MobileDatePicker';
ModalDatePicker.defaultProps = defaultProps;

export default ModalDatePicker;
