import React, { useState, useEffect } from 'react';
import './App.css';
import Doggie from './Doggie.jsx';
import Search from './Search.jsx';

const App = () => {

  const [pics, setPics] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [favourites, setFavourite] = useState([]);

  useEffect(() => {
    if (search) {
      setLoading(true);
      fetch(`https://dog.ceo/api/breed/${search}/images`)
        .then(res => {
          if (!res.ok) {
            setLoading(false);
            setError(true);
            setPics([]);
            setFavourite([]);
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
      <Search onChange={e => setQuery(e.target.value)} onClick={() => setSearch(query)} value={query} />
      {isLoading && <div className="lds-heart"><div></div></div>}
      {isError && <div className="data-error">Ooops, no such doggie in our database :(</div>}
      <div className="doggies-wrapper">
        <ul className="doggies-list">
          {pics.map((el, index) => (
            <Doggie item={el} index={index} favourites={favourites} onClick={() => setFavourite([...favourites, el].filter((el, i, arr) => arr.indexOf(el) === i))} />
          ))}
        </ul>
        {favourites.length > 0 && (
          <ul className="favourite-doggies__list">
            {favourites.map((el, index) => (
              <li key={index}>
                <img src={el} alt="" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
