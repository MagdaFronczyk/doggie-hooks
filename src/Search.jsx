import React from 'react';
import './App.css';

const Search = ({ onChange, onClick, value }) => {
    return (
        <div className="search-wrapper">
            <label htmlFor="search-term" className="search__label">find doggie</label>
            <input type="text"
                name="search-term"
                id="search-name"
                className="search__input"
                value={value}
                onChange={onChange} />
            <button className="search__button" onClick={onClick}>search</button>
        </div>
    )
}

export default Search;