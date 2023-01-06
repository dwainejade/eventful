import { createStore, action, persist } from "easy-peasy";


const store = createStore(
    persist({
        session: null,
        events: [],
        likedIds: [],
        likedEvents: [],
        searchResults: [],
        featuredId: [4733493, 6870586],
        ticketHeader: {}, // persons details and event details
        ticketFooter: {}, // ticket tiers and quantity
        tickets: [], // includes the header plus the ticket details

        // auth session
        setSession: action((state, payload) => {
            state.session = payload
        }),

        setEvents: action((state, payload) => {
            state.events = payload
        }),
        deleteEvent: action((state, id) => {
            state.events.filter((item) => item !== id)
        }),

        // search results
        setSearchResults: action((state, payload) => {
            state.searchResults = payload
        }),

        // liked events
        setLikedIds: action((state, payload) => {
            state.likedIds = payload
        }),
        addLikedId: action((state, payload) => {
            state.likedIds.push(payload)
        }),
        removeLikedId: action((state, payload) => {
            state.likedIds = state.likedIds.filter(
                (item) => item !== payload
            )
        }),
        setLikedEvents: action((state, payload) => {
            state.likedEvents = payload
        }),
        setFeaturedId: action((state, payload) => {
            state.featuredId = payload
        }),

        // ticketInfo
        setTicketHeader: action((state, payload) => {
            state.ticketHeader = payload
        }),
        setTicketFooter: action((state, payload) => {
            state.ticketFooter = payload
        }),
        setTickets: action((state, payload) => {
            state.tickets = payload
        }),
    }, {
        persistWhitelist: ['session']
    })
);


// if (process.env.NODE_ENV === "development") {
//     if (module.hot) {
//         module.hot.accept("./model", () => {
//             store.reconfigure(model);  // 👈 Here is the magic
//         });
//     }
// }

export default store;