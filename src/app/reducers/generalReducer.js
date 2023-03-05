import { ACCEPT_ACTION, RESET_ID, showModal } from "../actions/types"

//This is like a service
const initialState = { showModal: false, aceptAction: false, idPost: -1 }
export const generealReducer = (state = initialState, action) => {
    const { type, payload } = action;
    // console.log("In general reducer")
    // console.log(state, type, action, payload)
    switch (type) {
        case showModal:
            //state.showModal = payload
            //console.log("In state reducer")
            //console.log(state)
            //return {...state,showModalf}
            let newState = {
                ...state
            }
            newState.showModal = payload.value
            newState.idPost = payload.id?payload.id:-1
            return newState
            break
        case ACCEPT_ACTION:
            let newState2 = {
                ...state
            }
            newState2.aceptAction = payload.value
            newState2.showModal = false
            return newState2
            break
        case RESET_ID:
            let newState3 = {
                ...state
            }
            newState3.idPost = -1
            newState3.aceptAction = false
            newState3.showModal = false
            return newState3
        default:
            return state
    }
}
export default generealReducer