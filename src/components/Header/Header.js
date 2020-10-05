import React from 'react';
import './Header.css';

function Header({ onClick }) {
    return (
        <header className="header">
            <nav className="header__nav">
                <button className="filter__button" onClick={() => onClick('all')}>&rarr; Вce задачи</button>
                <button className="filter__button" onClick={() => onClick('done')}>&rarr; Выполненные задачи</button>
            </nav>
            <h1 className="header__heading">Список дел</h1>
        </header>
    )
}

export default Header;