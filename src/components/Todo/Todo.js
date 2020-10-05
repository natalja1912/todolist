import React from 'react';
import './Todo.css';
import EditIcon from '../../icons/EditIcon';
import CopyIcon from '../../icons/CopyIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import Checkbox from '../Checkbox/Checkbox';

function Todo({ todo, index, handleEditButton, handleCopyButton, handleDeleteButton, handleCheckBox }) {

    return (
        <li className="list__item" key={index}>
            <div className="list__item-text">
                <label className={`list__item-label ${todo.checked && 'label-strike'}`}>
                    <Checkbox checked={todo.checked} onClick={() => handleCheckBox(index)} />
                    {todo.task}
                </label>
            </div>
            <div className="list__item-buttons">
                <button className="list__item-button" onClick={() => handleEditButton(index)}><EditIcon /></button>
                <button className="list__item-button" onClick={() => handleCopyButton(index)}><CopyIcon /></button>
                <button className="list__item-button" onClick={() => handleDeleteButton(index)}><DeleteIcon /></button>
            </div>
        </li>
    )
}

export default Todo;

