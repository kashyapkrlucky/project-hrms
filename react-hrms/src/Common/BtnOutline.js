import React from 'react';
import { outlineBtn } from '../Utils/Classes';

function BtnOutline({ label, classes, ...others }) {
    return (
        <button {...others} className={outlineBtn + ' ' + classes}>
            {label}
        </button>
    )
}

export default BtnOutline
