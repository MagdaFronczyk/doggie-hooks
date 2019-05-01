import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  const [pics, setPics] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

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
      <div className="search--wrapper">
        <label htmlFor="search-term" className="search__label"> find the doggie </label>
        <input type="text"
          name="search-term"
          id="search-name"
          className="search__input"
          value={query}
          onChange={e => setQuery(e.target.value)} />
        <button className="search__button" onClick={() => setSearch(query)}>search</button>
      </div>
      {isLoading && <div className="lds-heart"><div></div></div>}
      {isError && <div className="data-error">Something went wrong</div>}
      <ul className="doggies-list">
        {pics.map((el, index) => (
          <li key={index} className="doggie">
            <img src={el} className="doggie__img"></img>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
