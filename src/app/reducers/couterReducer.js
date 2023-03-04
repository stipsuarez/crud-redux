//This is like a service
const initialState =2
export const couterReducer = (state=initialState, action) => {
    switch (action) {
        case "@counter/plus":
            return state.value += state.data

        case "@counter/subract":
            return state.value += state.data

        case "@counter/plusAsync":
            return state.value += state.data
        default:
            if (state.value % 2)
                return state.value += state.payload
            return state
    }
}
export default couterReducer