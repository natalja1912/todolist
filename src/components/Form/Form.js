import React from 'react';
import './Form.css';

function Form({ value, handleChange, handleSubmit }) {
    function handleButtonSubmit(evt) {
        evt.preventDefault();
        handleSubmit();
    }

    return (
        <form className="form">
            <input className="form__input" type="text" placeholder="Следующее дело..." value={value} onChange={(evt) => handleChange(evt.target.value)} />
            <button className="form__button" type="submit" onClick={(evt) => handleButtonSubmit(evt)}>Добавить</button>
        </form>
    )
}

export default Form;
