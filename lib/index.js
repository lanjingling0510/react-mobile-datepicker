import './index.css';
import React from 'react';
import DatePicker from './DatePicker.js';
import Modal from './Modal.js';

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

ModalDatePicker.defaultProps = {
    isPopup: true,
    isOpen: false,
    theme: 'default',
    value: new Date(),
    min: new Date(1970, 0, 1),
    max: new Date(2050, 0, 1),
    showHeader: true,
    dateFormat: ['YYYY', 'M', 'D'],
    showFormat: 'YYYY/MM/DD',
    confirmText: '完成',
    cancelText: '取消',
    onSelect: () => {},
    onCancel: () => {},
};

export default ModalDatePicker;
