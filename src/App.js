import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [pics, setPics] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${search}/images`)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => setPics(res.message))
      .catch(err => console.log(err))
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
