import produce from 'immer';
import createReducer from './ReducerUtils'

const initalState = {
    listArticles: [],
    selectedArticle: "",
    selectedArticleContent:[],
    jumpToComment : false,
}

const dataListArticles = {
    setListArticles(state, action) {
        state.listArticles = action.payload;
    },
    setSelectedArticle(state, action) {
        state.selectedArticle = action.payload;
    },
    setSelectedArticleContent(state, action) {
        state.selectedArticleContent = action.payload;
    },
    setJumpToComment(state, action) {
        state.jumpToComment= action.payload;
    },
}

export default produce((state, action) => createReducer(state, action, dataListArticles), initalState);