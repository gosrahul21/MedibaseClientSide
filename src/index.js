import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css'
import App from './App'
import store from './store'
import {Provider} from 'react-redux'

ReactDom.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,document.querySelector('#root')
    );