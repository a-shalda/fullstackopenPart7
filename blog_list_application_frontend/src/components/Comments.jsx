import commentsService from '../services/comments'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComments } from '../reducers/commentReducer'


import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'

const Comments = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const id = useParams().id

  console.log(id)


  useEffect(() => {
    commentsService.getComments(id).then(comments => {

      const filteredComments = comments.filter(comment => comment.blogId === id)
      dispatch(setComments(filteredComments))
    })
      .catch(error => error)

  }, [dispatch, id])

  const comments = useSelector(state => state.comments)
  console.log(comments)

  let mappedComments
  comments && (mappedComments = comments.map(comment => <li key={comment.id}>{comment.comment}</li>))

  return (
    <>
      <h4>Comments</h4>
      {mappedComments}
    </>
  )
}

export default Comments