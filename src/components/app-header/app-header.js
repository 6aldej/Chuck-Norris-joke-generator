import React from 'react';
import LogoImg from '../../img/logo.png'
import LikeCounterImg from '../../img/like-counter.png'
import './app-header.css';

const AppHeader = () => {
    return (
        <div className="app-header">
            <img className="logo" src={LogoImg} alt="logo"/>
            <div className="like-counter"><img src={LikeCounterImg} alt="like-counter"/><p>{localStorage.length}</p></div>
        </div>
    )
}

export default AppHeader;