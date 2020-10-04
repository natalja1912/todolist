import React from 'react';
import './App.css';
import todos from '../utils/constants';
import EditIcon from '../icons/EditIcon';
import CopyIcon from '../icons/CopyIcon';
import DeleteIcon from '../icons/DeleteIcon';

function App() {

  return (
    <div className="App">
      <header>
        <h1 className="header__heading">Список дел</h1>
      </header>
      <form className="form">
        <input className="form__input" type="text" placeholder="Следующее дело..." />
        <button className="form__button" type="submit">Добавить</button>
      </form>
      <ul className="list">
        {
          todos.map((todo, index) =>
            <li className="list__item" key={index}>
              <p className="list__item-text">{todo}</p>
              <div>
                <button className="list__item-button"><EditIcon /></button>
                <button className="list__item-button"><CopyIcon /></button>
                <button className="list__item-button"><DeleteIcon /></button>
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
