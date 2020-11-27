import React from 'react';

import './joke-list-item.css';

const JokeListItem = ({like, text, onToggleLikedArr}) => {

    let classNames = 'app-list-item';

    if (like) {
    classNames += ' like';
    }
    
    return (
            <div className={classNames}>
                <span 
                className="app-list-item-label"
                >
                {text}
                </span>
                <div className="heart">
                    <i className="fa fa-heart" onClick={onToggleLikedArr}></i>
                </div>
            </div>
    )
}
    
export default JokeListItem;