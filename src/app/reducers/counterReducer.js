//This is like a service
export const useCounter = (state, action) => {
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