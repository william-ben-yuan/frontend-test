import React from 'react';

const Alert = ({ show, message, variant }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={`alert alert-${variant}`} role="alert">
            {message}
        </div>
    );
};

export default Alert;