import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPaw } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import Doggie from "./Doggie.jsx";

library.add(faHeart, faPaw);

const App = () => {

  const [pics, setPics] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [favourites, setFavourite] = useState([]);
  const [mouseIsOver, setMouseIsOver] = useState(false);

  useEffect(() => {
    if (search) {
      setLoading(true);
      fetch(`https://dog.ceo/api/breed/${search}/images`)
        .then(res => {
          if (!res.ok) {
            setLoading(false);
            setError(true);
            setPics([]);
            throw new Error(res.statusText)
          }
          setLoading(false);
          setError(false);
          return res;
        })
        .then(res => res.json())
        .then(res => setPics(res.message))
        .catch(error => console.log(error))
    }
  }, [search])

  return (
    <div className="App">
      <div className="search-wrapper">
        <label htmlFor="search-term" className="search__label">find doggie</label>
        <input type="text"
          name="search-term"
          id="search-name"
          className="search__input"
          value={query}
          onChange={e => setQuery(e.target.value)} />
        <button className="search__button" onClick={() => setSearch(query)}>search</button>
      </div>
      {isLoading && <div className="lds-heart"><div></div></div>}
      {isError && <div className="data-error">Ooops, no such doggie in our database :(</div>}
      <ul className="doggies-list">
        {pics.map((el, index) => (
          <Doggie item={el} index={index} favourites={favourites} onClick={() => setFavourite([...favourites, el].filter((el, i, arr) => arr.indexOf(el) === i))} />
        ))}
      </ul>
      <div className="favourite-doggies-wrapper">
        <div className="favourite-doggies__icon" onMouseEnter={() => setMouseIsOver(!mouseIsOver)} >
          <FontAwesomeIcon icon="paw" className="favourite-doggies__paw" />
        </div>
        <ul className="favourite-doggies__list">
          {mouseIsOver && favourites.map((el, index) => (
            <li key={index}>
              <img src={el} alt="" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
