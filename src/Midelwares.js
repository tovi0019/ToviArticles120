
import { actions } from './Redux/action'



export const getListArticles = ({ dispatch, getState }) => next => action => {
    debugger
    if (action.type === 'GET_LIST_ARTICLES') {
        fetch("http://64.225.73.88:9078/articles/", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then((res) => {
                dispatch(actions.setListArticles(res))
            },
                (err) => {
                });

    }
    return next(action);
}
export const getSpesificArticle =  ({ dispatch, getState }) => next => action => {
    debugger
    
    var idArticle = getState().dataListArticles.selectedArticle;
    if (action.type === 'GET_SPESIFIC_ARTICLE') {
        
        fetch("http://64.225.73.88:9078/articles/"+idArticle, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
           
        }).then(res => res.json())
            .then((res) => {
                debugger
                dispatch(actions.setSelectedArticleContent(res));
                console.log(res);
            },
                (err) => {
                });

    }
    return next(action);
}