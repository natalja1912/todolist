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
  console.log('filt', filteredTasks);


  //при нажатии кнопки edit меняем значение поля ввода формы на текст задачи, к которой относится нажатая кнопка
  function handleEditButton(evt) {
    const selectedListItem = evt.target.closest('.list__item');
    const selectedInput = selectedListItem.querySelector('.list__item-text');
    document.querySelector('.form__input').value = selectedInput.textContent;
  }

  //копирование задачи
  function handleCopyButton(evt) {
    const selectedListItem = evt.target.closest('.list__item');
    const selectedInput = selectedListItem.querySelector('.list__item-text');
    //переменная newToDo  - скопированная задача, которую нужно добавить в список дел
    const newToDo = { task: selectedInput.textContent, checked: false };
    //определяем индекс задачи, которую нужно скопировать, в общем массиве дел
    let toDoToCopyIndex = 0;
    for (let i = 0; i < todolist.length; i++) {
      if (todolist[i].task === newToDo.task) {
        toDoToCopyIndex = i;
      }
    }
    //изменяем старый массив дел, добавляя в него скопированную задачу после аналогичной старой
    todolist.splice(toDoToCopyIndex, 0, newToDo);
    //создаем новый массив и с помощью него обновляем стейт todolist
    const newToDoList = todolist.concat();
    setToDoList(newToDoList);
  }

  //удаление задачи из списка дел
  function handleDeleteButton(evt) {
    //определяем, какую задачу нужно удалить
    const selectedListItem = evt.target.closest('.list__item');
    const selectedInput = selectedListItem.querySelector('.list__item-text');
    const deletedToDo = selectedInput.textContent;
    //определяем индекс задачи, которую нужно удалить, в общем массиве дел
    let toDoToDeleteIndex = 0;
    for (let i = 0; i < todolist.length; i++) {
      if (todolist[i].task === deletedToDo) {
        toDoToDeleteIndex = i;
      }
    }
    todolist.splice(toDoToDeleteIndex, 1);
    const newToDoList = todolist.concat();
    setToDoList(newToDoList);
  }

  //добавление новой задачи в список дел
  function handleSubmitButton(evt) {
    evt.preventDefault();
    setToDoList([
      {
        task: inputValue,
        checked: false
      },
      ...todolist
    ]);
    setInputValue('');
  }


  //изменение значка checkbox, отмечаем выполнена задача или нет
  function handleCheckBox(evt) {
    const label = evt.target.parentNode;
    todolist.forEach((todo) => {
      if (todo.task === evt.target.parentNode.textContent) {
        todo.checked ? todo.checked = false : todo.checked = true
      }
    })
    setToDoList(todolist);
    if (filter === 'done') {
      setFilter('change');
    }
    console.log('todolist');
    console.log(todolist);
    label.classList.toggle('label-strike');
  }

  //отрисовка задач при каждом изменении переменной filter 
  useEffect(() => {
    if (filter !== "all") {
      setFilteredTasks(todolist.filter(todo => todo.checked === true))
    }
    else {
      setFilteredTasks(todolist);
    }
    console.log('filteredTasks');
    console.log(filteredTasks);
  }, [filter]);


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
                <label className={`list__item-label ${todo.checked && 'label-strike'}`}>
                  <input className='list__item-checkbox' type="checkbox" defaultChecked={todo.checked} onClick={(evt) => handleCheckBox(evt)} />
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
