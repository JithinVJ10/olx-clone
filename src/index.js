import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import firebase from './firebase/config';
import { firebaseContext } from './store/Context';
import Context from './store/Context';

ReactDOM.render(
    <Router>
        <firebaseContext.Provider value={firebase}>
            <Context>
                <App /> 
            </Context>
        </firebaseContext.Provider>
    </Router>,
    document.getElementById('root')
);
