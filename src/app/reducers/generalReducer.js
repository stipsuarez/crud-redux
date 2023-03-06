import { ACCEPT_ACTION, RESET_ID, SET_CURRENT_POST, SET_ID, showModal } from "../actions/types"

//This is like a service
const initialState = {
    showModal: false, aceptAction: false, idPost: -1, currentPost: {
        id: -1,
        title: "",
        profileId: -1
    },action:""
}
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
            newState.idPost = payload.id ? payload.id : -1
            newState.action = payload.action
            return newState
            break
        case ACCEPT_ACTION:
            let newState2 = {
                ...state
            }
            newState2.aceptAction = payload.value
            newState2.showModal = false
            newState2.action = ""
            return newState2
        case SET_CURRENT_POST:
            let newState5 = {
                ...state
            }
            newState5.currentPost = payload.currentPost
            return newState5
        case SET_ID:
            let newState3 = {
                ...state
            }
            newState3.idPost = payload.id
            //newState3.aceptAction = false
            //newState3.showModal = false
            return newState3
        case RESET_ID:
            let newState4 = {
                ...state
            }
            newState4.idPost = -1
            newState4.aceptAction = false
            newState4.showModal = false
            return newState4
        default:
            return state
    }
}
export default generealReducer