import React from 'react';
import './Todo.css';
import Checkbox from '../Checkbox/Checkbox';

function Todo({ todo, index, handleEditButton, handleCopyButton, handleDeleteButton, handleCheckBox }) {

    return (
        <li className="list__item" key={index}>
            <div className="list__item-text">
                <Checkbox checked={todo.checked} onClick={() => handleCheckBox(todo.task)} />
                <p className={`list__item-label ${todo.checked && 'label-strike'}`}>{todo.task}</p>
            </div>
            <div className="list__item-buttons">
                <button className="list__item-button list__item-button_edit" onClick={() => handleEditButton(todo.task)}></button>
                <button className="list__item-button list__item-button_copy" onClick={() => handleCopyButton(todo.task)}></button>
                <button className="list__item-button list__item-button_delete" onClick={() => handleDeleteButton(todo.task)}></button>
            </div>
        </li>
    )
}

export default Todo;

