import React, { useEffect, useState } from 'react';
import './App.css';
import todos from '../../utils/constants';
import EditIcon from '../../icons/EditIcon';
import CopyIcon from '../../icons/CopyIcon';
import DeleteIcon from '../../icons/DeleteIcon';

function App() {
  const [todolist, setToDoList] = useState(todos);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState(todos);

  function handleEditButton(evt) {
    const selectedListItem = evt.target.closest('.list__item');
    const selectedInput = selectedListItem.querySelector('.list__item-text');
    document.querySelector('.form__input').value = selectedInput.textContent;
  }

  function handleCopyButton(evt) {
    const selectedListItem = evt.target.closest('.list__item');
    const selectedInput = selectedListItem.querySelector('.list__item-text');
    const newToDo = selectedInput.textContent;
    const toDoToCopyIndex = todolist.indexOf(newToDo);
    todolist.splice(toDoToCopyIndex, 0, newToDo);
    const newToDoList = todolist.concat();
    setToDoList(newToDoList);
  }

  function handleDeleteButton(evt) {
    const selectedListItem = evt.target.closest('.list__item');
    const selectedInput = selectedListItem.querySelector('.list__item-text');
    const deletedToDo = selectedInput.textContent;
    const toDoToDeleteIndex = todolist.indexOf(deletedToDo);
    todolist.splice(toDoToDeleteIndex, 1);
    const newToDoList = todolist.concat();
    setToDoList(newToDoList);
  }

  function handleSubmitButton(evt) {
    evt.preventDefault();
    setToDoList([
      inputValue,
      ...todolist
    ]);
    setInputValue('');
  }

  function handleCheckBox(evt) {
    const label = evt.target.parentNode;
    todolist.forEach((todo) => {
      if (todo.task === evt.target.parentNode.textContent) {
        todo.checked ? todo.checked = false : todo.checked = true
      }
    })
    setToDoList(todolist);
    label.classList.toggle('label-strike');
  }

  useEffect(() => {
    if (filter === "done") {
      setFilteredTasks(todolist.filter(todo => todo.checked === true))
    }
    else {
      setFilteredTasks(todolist);
    }
  }, [filter, todolist]);

  return (
    <div className="App">
      <header className="header">
        <nav className="header__nav">
          <button className="filter__button" onClick={() => setFilter('all')}>&rarr; Вce задачи</button>
          <button className="filter__button" onClick={() => setFilter('done')}>&rarr; Выполненные задачи</button>
        </nav>
        <h1 className="header__heading">Список дел</h1>
      </header>
      <form className="form">
        <input className="form__input" type="text" placeholder="Следующее дело..." value={inputValue} onChange={(evt) => setInputValue(evt.target.value)} />
        <button className="form__button" type="submit" onClick={(evt) => handleSubmitButton(evt)}>Добавить</button>
      </form>
      <ul className="list">
        {
          filteredTasks.map((todo, index) =>
            <li className="list__item" key={index}>
              <div className="list__item-text">
                <label className="list__item-label">
                  <input className="list__item-checkbox" type="checkbox" onClick={(evt) => handleCheckBox(evt)} />
                  {todo.task}
                </label>
              </div>
              <div className="list__item-buttons">
                <button className="list__item-button" onClick={(evt) => handleEditButton(evt)}><EditIcon /></button>
                <button className="list__item-button" onClick={(evt) => handleCopyButton(evt)}><CopyIcon /></button>
                <button className="list__item-button" onClick={(evt) => handleDeleteButton(evt)}><DeleteIcon /></button>
              </div>
            </li>)
        }
      </ul>
      <footer className="footer">
        © Natalia Pavlova. 2020
      </footer>
    </div>
  );
}

export default App;
