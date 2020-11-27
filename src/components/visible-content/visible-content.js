import React from 'react';
import JokeList from '../joke-list';
import JokeDisplay from '../joke-display';
import './visible-content.css';

const VisibleContent = ({joke, filter, onToggleLikedArr, onToggleLikedObj, welcomflag, loader}) => {
    if (filter==='liked') {
        joke.map(item => {
            let {id} = item;
            return id
        })
        return(
            <JokeList
            joke={joke}
            onToggleLikedArr={onToggleLikedArr}
            />
        )
    } else {
        return(
            <JokeDisplay
            joke={joke}
            welcomflag ={welcomflag}
            loader={loader}
            onToggleLikedObj={() => onToggleLikedObj(joke.id)}/>
        )
    }

}
    
export default VisibleContent;