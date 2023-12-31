/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
import  { useField } from './hooks/index'


const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5
  }

  const [notification, setNotification] = useState(null)

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>Anecdotes</Link>
        <Link style={padding} to='/create'>Create new</Link>
        <Link style={padding} to='/about'>About</Link>
      </div>
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} notification={notification}/>} />
        <Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Notification />

    </Router>
  )
}

const Notification = ({ notification }) => (

  notification && <p>a new anecdote "{notification}" created!</p>
)

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <Notification notification={notification} />
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))

  return (
    <>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const { reset: resetContent, ...contentField } = useField('text', 'content')
  const { reset: resetAuthor, ...authorField } = useField('text', 'author')
  const { reset: resetUrl, ...urlField } = useField('text', 'info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newAnecdote = {
      content: contentField.value,
      author: authorField.value,
      info: urlField.value,
      votes: 0
    }
    props.addNew(newAnecdote)
    props.setNotification(newAnecdote.content)
    setTimeout(() => {props.setNotification(null)}, 5000)
    navigate('/')
  }

  const handleClick = () => {
    resetContent()
    resetAuthor()
    resetUrl()
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url for more info
          <input {...urlField} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleClick}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew}/>
      <Footer />
    </div>
  )
}

export default App
