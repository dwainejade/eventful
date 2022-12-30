import { createStore, action, persist } from "easy-peasy";
// import data from '../data/MOCK_DATA.json'

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
    })
)

export default store;