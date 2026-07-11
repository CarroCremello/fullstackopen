import { createContext, useState, useContext, useRef } from 'react'

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null)
  const timerRef = useRef(null)

  const showNotification = (message) => {
    clearTimeout(timerRef.current)
    setNotification(message)
    timerRef.current = setTimeout(() => setNotification(null), 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, showNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotify = () => useContext(NotificationContext)

export default NotificationContext
