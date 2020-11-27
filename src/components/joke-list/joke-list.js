import React from 'react';
import JokeListItem from '../joke-list-item';

import './joke-list.css';

const JokeList = ({joke, onToggleLikedArr}) => {

    const elements = joke.map(item => {
        const {id, ...itemProps} = item;

        return (
            <div key={id} className="list-group-item">
                <JokeListItem 
                    {...itemProps}
                    onToggleLikedArr={() => onToggleLikedArr(id)}
                />
            </div>
        )
    })

    return (
        <div className="app-list">
            {elements}
        </div>
    )
}

export default JokeList;