import React, {Component} from 'react';
import './joke-status-filter.css';

export default class JokeStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'home', label: 'Home'},
            {name: 'liked', label: 'Like'},
        ]
    }
    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const {filter, onFilterSelect} = this.props;
            const active = filter === name;
            const clazz = active ? 'btn' : 'btn-outline'
            return (
                <button
                    type="button" 
                    key={name} 
                    className={`btn ${clazz}`}
                    onClick={() => onFilterSelect(name)}
                  
                >  {label}
                </button> 
            )
        })

        return (
            <div className="filter">
                {buttons}
            </div>
        )
    }
}