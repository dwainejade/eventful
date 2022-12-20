import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'

const data = require('../../data/MOCK_DATA.json')

const EventDetailsScreen = ({ route }) => {
    const [event, setEvent] = useState()
    const { itemId } = route.params;

    useEffect(() => {
        let eventDetails = data.filter(e => e.id === itemId)
        setEvent(() => eventDetails[0])
        console.log(eventDetails[0])
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
                        <View>
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
})