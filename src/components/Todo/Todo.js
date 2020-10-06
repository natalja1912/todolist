import React from 'react';
import './Todo.css';
import Checkbox from '../Checkbox/Checkbox';

function Todo({ todo, index, handleEditButton, handleCopyButton, handleDeleteButton, handleCheckBox }) {

    return (
        <li className="list__item" key={index}>
            <div className="list__item-text">
                <Checkbox checked={todo.checked} onClick={() => handleCheckBox(index)} />
                <p className={`list__item-label ${todo.checked && 'label-strike'}`}>{todo.task}</p>
            </div>
            <div className="list__item-buttons">
                <button className="list__item-button list__item-button_edit" onClick={() => handleEditButton(index)}></button>
                <button className="list__item-button list__item-button_copy" onClick={() => handleCopyButton(index)}></button>
                <button className="list__item-button list__item-button_delete" onClick={() => handleDeleteButton(index)}></button>
            </div>
        </li>
    )
}

export default Todo;

