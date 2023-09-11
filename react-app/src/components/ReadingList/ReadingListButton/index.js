
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const ReadingListButton = (props) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const readingList = useSelector((state) => state.readingList.readingList)
    const articleId = props.props

    const userReadingList = Object.values(readingList)

    let checker;
    const readingListChecker = (userReadingList, articleId) => {
        userReadingList.map(({article_id}) => {
            if(article_id === articleId) {
                return checker = true
            } else {
                return checker = false
            }
        })
    }

    readingListChecker(userReadingList, articleId)


    return (
        <>
            {checker ? (

                <button className="reading-list-button">
                <img className='bookmark-icon' src='/icons/bookmark_10330015.png' alt='bookmark'/>
                </button>
                ) : (<></>)}
        </>
    )
}


export default ReadingListButton
