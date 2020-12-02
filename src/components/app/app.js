import React, { Component } from 'react';

import AppHeader from '../app-header/';
import ButtonBlock from '../button-block';
import ErrorMessage from '../error-message';
import JokeStatusFilter from '../joke-status-filter';
import VisibleContent from '../visible-content';

import './app.css';


export default class App extends Component {
    state = {
                joke: {
                    text: '',
                    like: false,
                    id: '',
                },
                liked: [],
                filter: 'home',
                flag: false,
                loader: true,
                welcomflag: true,
                error: false
            };

    onToggleLikedObj = this.onToggleLikedObj.bind(this);
    onToggleLikedArr = this.onToggleLikedArr.bind(this);
    onFilterSelect = this.onFilterSelect.bind(this);
    clearFavoriteList = this.clearFavoriteList.bind(this);

    localJokeStorage() {
        this.setState(({liked}) => {
            let arr=[];
            for (let i=0; i < localStorage.length; i++) {
                let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
                arr.push(item)
            }
            arr.sort((a,b) => a.id-b.id)
            return {
                liked:  arr
            } 
        })
    }

    onError = (err) => {
        this.setState({
            loader: false,
            error: true
        })
    }

    getJoke = async () => {
        try{
            this.setState({
                loader: true,
                error: false,
                welcomflag: false,
            });
            let chuckJokes = await fetch(`https://api.chucknorris.io/jokes/random`);
            let data = await chuckJokes.json();
            let id = new Date().getTime();
            this.setState({
                joke: {text: data.value, like: false, id: id},
                loader: false
            });
        }
        catch(err) {
            console.warn(`We have an error here: ${err}`);
            this.onError(err);
        }
        this.localJokeStorage();
    }

    jokeStream = async () => {
        let flagK = this.state.flag;
        await this.setState({
            flag: !flagK
        })

        if (this.state.flag) {
            this.timerId = setInterval(this.getJoke, 10000)
        } else {
            clearInterval(this.timerId)
        }
    }

    onToggleLikedObj(idd) {
        this.setState(({joke, liked}) => {
            
            joke.like = !joke.like;
            
            const newArr = [...liked].filter(item => item.id !== idd)

            let arr;

            if (liked.length<10) {
                if (joke.like) {
                    arr = [...newArr, joke]
                 } else {
                    arr = [...newArr]
                }

            } else {
                if (joke.like) {
                    arr = [...newArr, joke]
                    arr.splice(0, 1)
                } else {
                    arr = [...newArr]
                }
            }

            localStorage.clear();
            for (let i=0; i<arr.length; i++){
                let item = arr[i]
                localStorage.setItem(item.id, JSON.stringify(item))
            }

            return {
                liked: arr
            } 
        });
    }

    onToggleLikedArr(idd) {
        this.setState(({liked, joke}) => {
            const jokes = liked.filter(item => {
                return item.id === idd;
            });

            jokes[0].like = !jokes[0].like;

            if (!jokes[0].like) {
                localStorage.removeItem(jokes[0].id)
            };

            const newArr = [...liked].filter(item => {
                return item.id !== idd
            });

            return {
                liked: newArr,
                joke: {text: joke.text, like: !joke.like, id: joke.id}
            };
        });
    }

    filterPost(filter) {
        if(filter === 'liked') {
            return this.state.liked
        } else {
            return this.state.joke
        }
    }

    onFilterSelect(filter) {
        this.setState({filter})
        this.localJokeStorage();
    }

    clearFavoriteList() {
        localStorage.clear();
        this.localJokeStorage();
        this.setState(({joke}) => {
            joke.like = !joke.like
        });
    }

    render () {
        const {filter, flag, loader, welcomflag, error} = this.state;
        const visibleJokes = this.filterPost(filter);
        const content = error 
        ? <ErrorMessage/> 
        : <VisibleContent
            joke={visibleJokes} 
            filter={filter}
            loader={loader}
            welcomflag={welcomflag}
            onToggleLikedObj={this.onToggleLikedObj}
            onToggleLikedArr={this.onToggleLikedArr}
        />

        return (
            <div className='app'>
                <AppHeader/>
                <JokeStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}
                />
                <ButtonBlock 
                    getJoke={this.getJoke} 
                    jokeStream={this.jokeStream} 
                    clearFavoriteList={this.clearFavoriteList}
                    flag={flag}
                    filter={filter}
                />
                {content}
            </div>
        )
    }
}
