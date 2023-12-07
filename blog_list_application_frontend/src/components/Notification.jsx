import { useSelector } from 'react-redux'


const Notification = () => {

  const notificationArr = useSelector(state => state.notification)

  if (notificationArr === null) {
    return null
  }

  const [notification, error] = notificationArr

  return (
    <div className={error}>
      {notification}
    </div>
  )
}

export default Notification