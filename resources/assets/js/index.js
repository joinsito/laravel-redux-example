import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Routes from './routes';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(
    promise
)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Routes/>
    </Provider>
    , document.querySelector('#reactcontainer'));