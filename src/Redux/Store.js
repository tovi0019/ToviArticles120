import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import dataListArticles from './Reducer/dataListArticles'
import {getListArticles,getSpesificArticle} from '../Midelwares'



const reducer = combineReducers({ dataListArticles});

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(getListArticles,getSpesificArticle)))
window.store = store

export default store;