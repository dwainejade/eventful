import { createStore, action, persist } from "easy-peasy";
import data from '../data/MOCK_DATA.json'

const store = createStore(
    persist({
        events: data,
        addEvent: action((state, payload) => {
            state.events.push(payload);
        }),
        deleteEvent: action((state, id) => {
            state.events.filter((item) => item !== id)
        })
    })
)

export default store;