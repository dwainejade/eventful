import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Entypo } from '@expo/vector-icons';


const EventDetailsScreen = ({ navigation, route }) => {
    const data = useStoreState((state) => state.events);
    const getEvent = useStoreActions(actions => actions.getEvent)
    const [event, setEvent] = useState()
    const { itemId } = route.params;

    useEffect(() => {
        let event = data.filter((item) => item.id === itemId)
        setEvent(() => event[0])
        // console.log(event)
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

            <View style={styles.bottomTab}>
                <TouchableOpacity style={styles.shareBtn}>
                    <Entypo name="share" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate('Booking')}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }} >Book Ticket</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{event?.price}</Text>
            </View>
        </View >
    )
}

export default EventDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
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
    },
    bottomTab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        left: '-2.5%',
        width: '105%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E9EBED',
        borderBottomColor: 'transparent',
        borderRadius: 30,
        shadowRadius: 1,
        elevation: 5,
        height: 60,
        paddingTop: 15,
        marginBottom: 30,
    },
    shareBtn: {
        backgroundColor: '#f5f5f5',
        padding: 4,
        borderRadius: 15,
    },
    bookBtn: {
        width: 200,
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 20,
    },
})