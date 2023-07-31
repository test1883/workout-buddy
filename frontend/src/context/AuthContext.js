import { createContext, useReducer, useEffect } from 'react'
import socketIO from 'socket.io-client';


export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      const socket = socketIO.connect(`${process.env.REACT_APP_SERVER}`);
      const userName = user.userName
      socket.on('connect', () => {
        socket.emit('newUser', { userName, socketID: socket.id });
      })
      dispatch({type: "LOGIN", payload: {...user,socket}})
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}