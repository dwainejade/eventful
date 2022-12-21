import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { useStoreState, useStoreActions } from 'easy-peasy'

const EventDetailsScreen = ({ route }) => {
    const data = useStoreState((state) => state.events);
    const getEvent = useStoreActions(actions => actions.getEvent)
    const [event, setEvent] = useState()
    const { itemId } = route.params;

    useEffect(() => {
        let event = data.filter((item) => item.id === itemId)
        setEvent(() => event[0])
        console.log(event)

        // console.log(eventDetails[0])
    }, [])

    return (
        <View style={styles.container}>
            {!event ?
                <Text>Loading...</Text>
                :

                <ScrollView>

                    <View>
                        <Image
                            style={styles.poster}
                            source={{ uri: event.poster }}
                        />
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={styles.eventTypeButton}>
                            <Text style={styles.eventTypeText} >{event.eventType}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>{event.title}</Text>
                        </View>
                        <View>
                            <Text>{event.eventDate}</Text>
                            <Text>Saturday, 4:00 PM - 10:00 PM</Text>
                        </View>

                        <View style={styles.organizerContainer}>
                            <Image style={styles.organizerImage} source={{ uri: "https://randomuser.me/api/portraits/thumb/men/7.jpg" }} />
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={styles.header}>{event.organizer}</Text>
                                <Text style={styles.subText}>Organizer</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>About Event</Text>
                            <Text>{event.description}</Text>
                        </View>
                    </View>


                </ScrollView>
            }
        </View>
    )
}

export default EventDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    poster: {
        flex: 1,
        height: 300,
        resizeMode: 'cover'
    },
    detailsContainer: {
        paddingHorizontal: '4%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    eventTypeButton: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 12,
        alignSelf: 'left',
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginVertical: 10,
    },
    eventTypeText: {
        fontSize: 11,
    },
    organizerContainer: {
        flexDirection: 'row',
    },
    organizerImage: {
        resizeMode: 'cover',
        width: 42,
        height: 42,
        borderRadius: 25,
        marginRight: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    header: {
        fontWeight: 'bold'
    },
    subText: {
        color: '#777'
    }
})