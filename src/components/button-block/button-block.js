import React from 'react';

import ListEmptyImg from '../../img/list-empty.png';
import './button-block.css';

const ButtonBlock = ({getJoke, jokeStream, flag, filter, clearFavoriteList}) => {

    let option = 'Joke',
        activeBtn = false;

    if (flag) {
        activeBtn = true;
        option = "Stop";
    }

    if (filter==='home'){
        return (
            <div className="block">
                <button disabled={activeBtn} onClick={getJoke}>Get Joke</button>
                <button onClick={jokeStream}>{option} Stream</button>
            </div>
        )
    } else {
        if (localStorage.length===0) {
            return (
                <div className="img-block">
                    <img src={ListEmptyImg} alt='list is empty'/>
                </div>
            )
        } else {
            return (
                <div className="clear-block">
                    <button onClick={clearFavoriteList}>Clear list <i className="fa fa-trash-o"></i></button>
                    <h3>Your favorite jokes ({localStorage.length}/10):</h3>
                </div>
            )
        }

    }
}

export default ButtonBlock;