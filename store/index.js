import { createStore, action, persist } from "easy-peasy";

const store = createStore(
    persist({
        events: [],
        setEvents: action((state, payload) => {
            state.events = payload
        }),
        deleteEvent: action((state, id) => {
            state.events.filter((item) => item !== id)
        }),
        // auth session
        session: null,
        setSession: action((state, payload) => {
            state.session = payload
        }),
        // search results
        searchResults: [],
        setSearchResults: action((state, payload) => {
            state.searchResults = payload
        }),

        // liked events
        likedEvents: [],
        setLikedEvents: action((state, payload) => {
            state.likedEvents = payload
        }),
        addLikedEvent: action((state, payload) => {
            state.likedEvents.push(payload)
        }),
        removeLikedEvent: action((state, payload) => {
            const newState = state.likedEvents.filter(item => item !== payload)
            state.likedEvents = newState
        }),

    }),
)

export default store;