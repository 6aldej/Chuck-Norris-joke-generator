import React from 'react';
import WelcomImg from '../../img/welcom.png';
import Loader from '../loader'
import './joke-display.css';

const JokeDisplay = ({joke, onToggleLikedObj, welcomflag, loader}) => {

    let classNames = 'display-item';

    if (joke.like) {
    classNames += ' like';
    }

    if (welcomflag) {
        return (
            <div className="welcome">
                <img src={WelcomImg} alt='Hey Dog! Hi.'/>
            </div>
        )
    } else {
        if (loader) {
            return (
                <div className="loader">
                    <Loader />
                </div>
        )
        } else {
            return (
                <div className={classNames}>
                    <span 
                    className="app-list-item-label"
                    >
                        {joke.text}
                    </span>
                    <div className="heart">
                        <i className="fa fa-heart" onClick={onToggleLikedObj}></i> 
                    </div>
                </div>
        ) 
        }
    }
}
    
export default JokeDisplay;