import React, { useEffect, useState, useRef } from 'react'
import { Animated, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Entypo, Ionicons } from '@expo/vector-icons';
import Divider from '../../components/Divider'
import BackButton from '../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabase/supabase';
import axios from 'axios';

const EventDetailsScreen = ({ navigation, route }) => {
    const data = useStoreState((state) => state.events);
    const getEvent = useStoreActions(actions => actions.getEvent)
    const [event, setEvent] = useState(null)
    const [venue, setVenue] = useState(null)
    const { itemId } = route.params;
    const { navigate } = useNavigation()
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let event = data.filter((item) => item.id === itemId)
        setEvent(() => event[0])
        // console.log(event)
        fadeIn()
        if (event) {
            getVenue(event.venue)
        }
    }, [event])

    async function getVenue(id) {
        let { data: Venue, error } = await supabase
            .from('Venue')
            .select(id)
            .then(setVenue(Venue))

        if (error) {
            console.log('error getting venue', error)
        }
        setVenue(Venue[0])
        console.log(Venue)
        return Venue
    }

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: -100,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    return (
        <View style={styles.container}>
            <BackButton />
            {!event ?
                <Text>Loading...</Text>
                :

                <ScrollView>

                    <View>
                        <TouchableHighlight onPress={() => navigate('Poster', { imageData: event.poster })}>
                            <Image
                                style={styles.poster}
                                source={{ uri: event.poster }}
                            />
                        </TouchableHighlight>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={styles.eventTypeButton}>
                            <Text style={styles.eventTypeText} >{event.event_type}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>{event.title}</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Entypo name="calendar" size={24} color="black" />
                            <View style={styles.textCon}>
                                <Text style={{ fontWeight: 'bold' }}>{event.start_date}</Text>
                                <Text>Saturday, 4:00 PM - 10:00 PM</Text>
                            </View>
                        </View>

                        <View style={styles.flexRow}>
                            <Entypo name="location" size={24} color="black" />
                            <View style={styles.textCon}>
                                <Text style={{ fontWeight: 'bold' }}>Club Paradise</Text>
                                <Text>{venue?.address}</Text>
                            </View>
                        </View>

                        <Divider />

                        <View style={styles.organizerContainer}>
                            <Image style={styles.organizerImage} source={{ uri: "https://randomuser.me/api/portraits/thumb/men/7.jpg" }} />
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={[styles.header, { marginBottom: 2 }]}>{event.organizer}</Text>
                                <Text style={styles.subText}>Organizer</Text>
                            </View>
                        </View>
                        <View style={{ paddingBottom: 140 }}>
                            <Text style={[styles.header, { marginBottom: 6 }]}>About Event</Text>
                            <Text style={{ fontSize: 16 }}>{event.description}</Text>
                        </View>
                    </View>

                </ScrollView>
            }

            <Animated.View style={[styles.bottomTab, { transform: [{ translateY: fadeAnim }] }]} >
                <View style={styles.shareBtnCon}>
                    <TouchableOpacity style={styles.shareBtn}>
                        <Entypo name="share" size={30} color="black" />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate('Booking')}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }} >Book Ticket</Text>
                </TouchableOpacity>

                <Text style={styles.price}>${event?.price} /<Ionicons name='person' size={18} /> </Text>
            </Animated.View>
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
        fontSize: 24,
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
        fontSize: 14,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    textCon: {
        marginLeft: 10
    },
    locationTextCon: { marginLeft: 10 },
    organizerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    organizerImage: {
        resizeMode: 'cover',
        width: 42,
        height: 42,
        borderRadius: 25,
        marginRight: 8,
        alignItems: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    subText: {
        color: '#777',
    },
    bottomTab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        left: '-2.5%',
        width: '105%',
        position: 'absolute',
        bottom: -100,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E9EBED',
        borderBottomColor: 'transparent',
        borderRadius: 30,
        shadowRadius: 1,
        elevation: 5,
        height: 95,
        paddingTop: 12,
        paddingBottom: 30
    },
    shareBtnCon: {
        width: '25%'
    },
    shareBtn: {
        backgroundColor: '#E9EBED',
        padding: 4,
        borderRadius: 20,
        width: 40,
        height: 40,
        marginLeft: 20
    },
    bookBtn: {
        width: '45%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 25,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '25%',
        height: 40,
        paddingVertical: 8,
        textAlign: 'center',
    }
})