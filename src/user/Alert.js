import React from "react";
import './Alert.css';

export default function Alert({ children, type, message }) {

    const renderElAlert = function () {
        return React.cloneElement(children);
    };

    return (
        <div className={'alert ' + type}>
            <span className='closebtn'>
                &times;
            </span>
            {children ? renderElAlert() : message}
        </div>
    );
}