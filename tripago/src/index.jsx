import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';

import Main from 'components/Main.jsx';
import {result, userInfo, login, atMain} from 'states/result-reducers.js';
import {searchText, hotel, hotelForm} from 'states/hotel-reducers.js';
import {trans, transForm} from 'states/trans-reducers.js';
import {site, siteForm} from 'states/site-reducers';
import {main} from 'states/main-reducers.js';

import 'bootstrap/dist/css/bootstrap.css';

window.onload = function() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({
        searchText,
        result, userInfo, login, atMain,
        hotel, hotelForm,
        trans, transForm,
        site, siteForm,
        main,
    }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));

    ReactDOM.render(
        <Provider store={store}>
            <Main />
        </Provider>,
        document.getElementById('root')
    );
};
