import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

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
            setError(false);
            throw new Error(res.statusText)
          }
          setLoading(false);
          return res;
        })
        .then(res => res.json())
        .then(res => setPics(res.message))
        .catch(error => setError(true))
    }
  }, [search])

  return (
    <div className="App">
      <label htmlFor="">
        find the doggie
        <input type="text"
          value={query}
          onChange={e => setQuery(e.target.value)} />
      </label>
      <button onClick={() => setSearch(query)}>
        search
      </button>
      {isLoading && <div>Loading</div>}
      {isError && <div>Something went wrong</div>}
      <ul>
        {pics.map((el, index) => (
          <li key={index}>
            <img src={el}></img>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
