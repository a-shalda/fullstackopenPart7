import commentsService from '../services/comments'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComments } from '../reducers/commentReducer'
import { setNotification } from '../reducers/notificationReducer'

import { useParams } from 'react-router-dom'

const Comments = () => {

  const [newComment, setNewComment] = useState('')

  const dispatch = useDispatch()
  const id = useParams().id

  const comments = useSelector(state => state.comments)

  let mappedComments

  if (comments) {
    const filteredComments = comments.filter(comment => comment.blogId === id)
    mappedComments = filteredComments.map(comment => <li key={comment.id}>{comment.comment}</li>)
  }

  const getId = () => (100000 * Math.random()).toFixed(0)

  const handleForm = async (e) => {
    e.preventDefault()
    try {
      const commentToAdd = {
        comment: newComment,
        blogId: id,
        id: getId()
      }
      await commentsService.postComment(id, newComment)
      dispatch(setComments(comments.concat(commentToAdd)))
    } catch {dispatch(setNotification(['Min length is 3 characters', 'error'], 5000))}
    setNewComment('')
  }

  return (
    <div className='comments'>
      <h4>Comments</h4>
      <form className='form' onSubmit={handleForm}>
        <div className='form__row'>
          <input
            className='form__input--comment'
            type='text'
            value={newComment}
            placeholder='your comment...'
            onChange={({ target }) => setNewComment(target.value)}
          />
        </div>
        <button type='submit'>Post</button>
      </form>
      {mappedComments}
    </div>
  )
}

export default Comments