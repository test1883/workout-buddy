import {useAuthContext} from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = (socket) => {
        localStorage.removeItem("user")
        socket.disconnect()

        dispatch({type:"LOGOUT"})
        workoutsDispatch({type:"SET_WORKOUTS", payload: null})
    }
    return {logout}
}