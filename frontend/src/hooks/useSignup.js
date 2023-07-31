import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import socketIO from 'socket.io-client';

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (socket, userName, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(process.env.SERVER+'/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ userName, email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      const socket = await socketIO.connect(process.env.SERVER);
      const userName = json.userName
      await socket.on('connect', () => {
        socket.emit('newUser', { userName, socketID: socket.id });
      });
      // update the auth context
      dispatch({type: 'LOGIN', payload: {...json, socket}})
      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}