

import { connect } from 'react-redux';
import { actions } from './Redux/action';
import './ViewArticles.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import './Article.css'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useRef, useState } from 'react';
import { scroller } from "react-scroll";

function mapStateToProps(state) {
    return {
        selectedArticle: state.dataListArticles.selectedArticle,
        selectedArticleContent: state.dataListArticles.selectedArticleContent,
        jumpToComment: state.dataListArticles.jumpToComment,
    }
}

const mapDispatchToProps = (dispatch) => ({

    setSelectedArticle: (article) => dispatch(actions.setSelectedArticle(article)),
    setSelectedArticleContent: (article) => dispatch(actions.setSelectedArticleContent(article)),
    getSpesificArticle: () => dispatch(actions.getSpesificArticle()),//קבלת תוכן מאמר
    setJumpToComment: (jumpToComment) => dispatch(actions.setJumpToComment(jumpToComment)),//עדכון חלונית הקפיצה

})



export default connect(mapStateToProps, mapDispatchToProps)(function Article(props) {
    let { selectedArticle, selectedArticleContent, jumpToComment,
        setSelectedArticle, setSelectedArticleContent, getSpesificArticle, setJumpToComment } = props;
   
    const [open, setOpen] = useState(false);
    const [place, setPlace] = useState(0);

    useEffect(() => {
        if (jumpToComment == false && place != 0) {
            var vertically = document.getElementById(place).getBoundingClientRect().top + window.scrollY;
            window.scrollTo(300, (vertically));
        }
    }, [jumpToComment])
    const handleOpen = () => {
        setJumpToComment(true);
    };
    const handleClose = () => {
        setOpen(false);

    };
    function handlePlace(id) {
        setPlace(id);
    };


    const body = (
        <div className="paper">
            <p id="simple-modal-description" dir="rtl" >
                קפוץ לתגובה מספר...
        </p>
            <div className="select"><Select className="select" onChange={(e) => handlePlace(e.target.value)} >
                <option aria-label="None" value="" />
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
            </Select>
            </div>
            <button className="buttonInModal" onClick={() => scrollWithhandleClose()}>קפוץ</button>
        </div>
    );

    
    function openAlertJump() {
        setJumpToComment(true);
    }
    function scrollWithhandleClose() {
        setJumpToComment(false);
    }
    function scrollWin(id) {
        var vertically = document.getElementById(id).getBoundingClientRect().top + window.scrollY;
        window.scrollTo(300, vertically);
    }

    return (
        <>
            <h1>אני מאמר {selectedArticle}</h1>
            <button className="buttonJump" onClick={handleOpen}>קפוץ לתגובה</button>
            <button className="buttonJump" onClick={() => scrollWin(1)} >למעלה </button>
            <button className="buttonJump" onClick={() => scrollWin(8)}>למטה </button>

            <div >
                {selectedArticleContent.comments != undefined &&
                    <>
                        <div>{selectedArticleContent.content}</div>
                        <h3>תגובות</h3>
                        <div>{selectedArticleContent.comments.map((comment) => {
                            return (
                                <>
                                    <div >
                                        <Accordion className="commentDetails">
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography className="comment" id={comment.id} dir="rtl">{comment.title}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <div >מאמר {comment.article_id}</div>
                                                    <div >תגובה זו נוצרה ב : {comment.created_at}</div>
                                                    <div >תגובה זו עודכנה ב :{comment.updated_at}</div>

                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>

                                </>
                            )
                        })}</div>
                    </>
                }
            </div>
            <div>
                <Modal
                    open={jumpToComment}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {body}
                </Modal>
            </div>

        </>
    )
})
