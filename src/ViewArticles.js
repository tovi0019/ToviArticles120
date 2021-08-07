
import { useEffect } from "react";
import React from 'react';
import { connect } from 'react-redux'
import { actions } from "./Redux/action";
import './ViewArticles.css'
import  {withRouter} from "react-router-dom";

function mapStateToProps(state) {
    return {
        listArticles: state.dataListArticles.listArticles,//רשימת המאמרים
        selectedArticle: state.dataListArticles.selectedArticle,//id-המאמר הנבחר 
        selectedArticleContent: state.dataListArticles.selectedArticleContent,//content-המאמר הנבחר 
    }
}

const mapDispatchToProps = (dispatch) => ({

    getListArticles: () => dispatch(actions.getListArticles()),//קבלת רשימת מאמרים
   getSpesificArticle: () => dispatch(actions.getSpesificArticle()),//קבלת תוכן מאמר
    setSelectedArticle: (article) => dispatch(actions.setSelectedArticle(article)),//id-עדכון המאמר הנבחר
    setSelectedArticleContent: (article) => dispatch(actions.setSelectedArticleContent(article)),//content-עדכון המאמר הנבחר

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function ViewArticles(props) {

    let { listArticles, getListArticles, getSpesificArticle, setSelectedArticle } = props;

    useEffect(() => {
        if (listArticles != undefined && listArticles.length == 0)
            getListArticles();
    }, [listArticles])

       function  openArticle(e) {
        setSelectedArticle(e);
        getSpesificArticle();
        props.history.push("/Article");
    }
    
    return (
        <>
            <h1 className="title">מאמרים</h1>
            <div >
                {listArticles && listArticles.map((article) => {
                    return (
                        <>
                            <div className="article" key={article.id} onClick={() => openArticle(article.id)}>{article.title}</div>
                        </>
                    )
                })
                }
            </div>
        </>
    )
}))




