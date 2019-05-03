import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add(faHeart);

const Doggie = ({ item, index, onClick }) => {

    const [isLiked, setIsLiked] = useState(false);

    return (
        <li key={index} className="doggie">
            <img src={item} className="doggie__img" alt=""></img>
            <FontAwesomeIcon icon="heart" className={isLiked ? `doggie__heart doggie__heart--liked` : "doggie__heart"} onClick={() => { onClick(); setIsLiked(!isLiked) }} />
        </li>
    )
}

export default Doggie;