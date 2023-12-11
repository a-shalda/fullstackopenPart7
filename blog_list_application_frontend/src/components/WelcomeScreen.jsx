import { Link } from 'react-router-dom'


const WelcomeScreen = () => {

  return (
    <>
      <h2>LinkApp</h2>
      <h3>Welcome</h3>
      <Link to='/login'>Login</Link>
      <span> or </span>
      <Link to='/registration'>Register</Link>
    </>
  )
}

export default WelcomeScreen