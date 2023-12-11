import { Link } from 'react-router-dom'


const WelcomeScreen = () => {

  return (
    <>
      <div className='header'>
        <div className='header__links'>
          <div className='header__welcome'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign up</Link>
          </div>
        </div>
      </div>
      <>
        <h2>Blogs App</h2>
      </>
    </>
  )
}

export default WelcomeScreen