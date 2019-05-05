import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add(faTimes);

const DoggieFav = ({ item, index, onClick }) => {
    return (
        <li key={index} className="doggie">
            <img src={item} className="doggie__img" alt=""></img>
            <FontAwesomeIcon icon="times" className="doggie__cross" onClick={() => onClick()} />
        </li>
    )
}

export default DoggieFav;