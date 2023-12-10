import commentsService from '../services/comments'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComments } from '../reducers/commentReducer'
import { setNotification } from '../reducers/notificationReducer'


import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'

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
    <>
      <h4>Comments</h4>
      <form onSubmit={handleForm}>
        <input
          type='text'
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button type='submit'>add comment</button>
      </form>
      {mappedComments}
    </>
  )
}

export default Comments