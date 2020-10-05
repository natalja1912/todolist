import React from 'react';
import './Checkbox.css';

function Checkbox({ checked, onClick }) {
    return (
        <button className={`checkbox ${checked && 'checkbox_checked'}`} onClick={onClick}></button>
    )
}

export default Checkbox;