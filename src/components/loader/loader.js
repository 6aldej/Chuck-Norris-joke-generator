import React from 'react';
import LoaderImg from '../../img/loader.png'
import './loader.css';

const Loader = () => {
    return (
        <div className="chuck-loader">
            <img src={LoaderImg} alt="loader"/>
        </div>
    )
}
    
export default Loader;