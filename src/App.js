import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [pics, setPics] = useState(null);
  const [searchTerm, setSerchTerm] = useState("");

  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${searchTerm}/images`)
      .then(res => res.json())
      .then(res => setPics(res.message))
  }, [searchTerm])

  console.log(pics, searchTerm)

  return (
    <div className="App">
      <label htmlFor="">
        find the doggie
        <input type="text"
          value={searchTerm}
          onChange={e => setSerchTerm(e.target.value)} />
      </label>
      <ul>
        {pics !== null ? (pics.map((el, index) => (
          <li key={index}>
            <img src={el}></img>
          </li>
        ))) : null}
      </ul>
    </div>
  );
}

export default App;
