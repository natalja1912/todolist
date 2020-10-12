import React, { useState } from 'react';
import './App.css';
import todos from '../../utils/constants';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Form from '../Form/Form';
import Todo from '../Todo/Todo';

function App() {
  const [todolist, setToDoList] = useState(todos);
  const [inputValue, setInputValue] = useState('');
  //переменная taskToEdit для определения, какое задание нужно редактировать, при сабмите формы
  const [taskToEdit, setTaskToEdit] = useState();
  const [filter, setFilter] = useState('all');
  const [submitButtonValue, setSubmitButtonValue] = useState('Добавить');

  //при нажатии кнопки edit меняем значение поля ввода формы на текст задачи, к которой относится нажатая кнопка
  function handleEditButton(value) {
    const index = todolist.findIndex( todo => todo.task === value );
    setSubmitButtonValue('Сохранить');
    const selectedTask = todolist[index];
    setInputValue(selectedTask.task);
    setTaskToEdit(index);
  }

  //копирование задачи
  function handleCopyButton(value) {
    const index = todolist.findIndex( todo => todo.task === value );
    const selectedTask = todolist[index];
    todolist.splice(index, 0, selectedTask);
    const newToDoList = todolist.concat();
    setToDoList(newToDoList);
  }

  //удаление задачи из списка дел
  function handleDeleteButton(value) {
    const index = todolist.findIndex( todo => todo.task === value );
    todolist.splice(index, 1);
    const newToDoList = todolist.concat();
    setToDoList(newToDoList);
  }

  //добавление новой задачи в список дел
  function handleSubmitButton() {
    if (typeof taskToEdit !== 'number') {
      setToDoList([
        {
          task: inputValue,
          checked: false
        },
        ...todolist
      ])
    }
    else {
      todolist.splice(taskToEdit, 1, { task: inputValue, checked: false });
      const newToDoList = todolist.concat();
      setToDoList(newToDoList);
    }
    setInputValue('');
    setTaskToEdit();
    setSubmitButtonValue('Добавить');
  }


  //изменение значка checkbox, отмечаем выполнена задача или нет
  function handleCheckBox(value) {
    const index = todolist.findIndex( todo => todo.task === value );
    const selectedTask = todolist[index];
    todolist.splice(index, 1, { task: selectedTask.task, checked: !selectedTask.checked });
    const newToDoList = todolist.concat();
    setToDoList(newToDoList);
  }

  //массив сделанных заданий
  const doneToDos = todolist.filter(todo => todo.checked === true);
  //массив заданий для отрисовки
  let renderedToDos = [];
  filter === 'done' ? renderedToDos = doneToDos : renderedToDos = todolist;

  return (
    <div className="App">
      <Header onClick={(value) => setFilter(value)} />
      <Form value={inputValue} submitButtonValue={submitButtonValue} handleChange={(value) => setInputValue(value)} handleSubmit={handleSubmitButton} />
      <ul className="list">
        {
          renderedToDos.map((todo, index) =>
            <Todo todo={todo} index={index} handleCopyButton={(value) => handleCopyButton(value)} handleEditButton={(value) => handleEditButton(value)} handleDeleteButton={(value) => handleDeleteButton(value)} handleCheckBox={(value) => handleCheckBox(value)} />)
        }
      </ul>
      <Footer />
    </div>
  );
}

export default App;
