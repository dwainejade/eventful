import React, { useEffect, useState, useRef, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import { supabase } from '../../supabase/supabase';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Divider from '../../components/Divider'
import BackButton from '../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import Map from '../../components/Map';
import { format, parseISO } from "date-fns";
import * as Animatable from 'react-native-animatable';

const EventDetailsScreen = ({ navigation, route }) => {
    const [isPosterLoading, setIsPosterLoading] = useState(true);
    const [event, setEvent] = useState(null)
    const [venue, setVenue] = useState(null)
    const { itemId } = route.params;
    const { navigate } = useNavigation()
    const scrollRef = useRef()

    useEffect(() => {
        if (event) {
            getVenue(event.venue)
        } else getEvent(itemId)
    }, [itemId, event])

    const getEvent = useCallback(async (id) => {
        let { data: Events, error } = await supabase
            .from('Events')
            .select('*')
            .eq('id', id)
        setEvent(Events[0]);
        if (error) {
            console.log("getEvents error: ", error)
            return null
        }
    }, []);

    const getVenue = useCallback(async (id) => {
        let { data: Venue, error } = await supabase
            .from('Venue')
            .select('*')
            .eq('id', id)
        if (Venue) {
            setVenue(Venue[0])
            // console.log(Venue[0])
        }
        if (error) {
            return null
        }
    }, [itemId]);


    return (
        <SafeAreaView style={styles.container}>
            <BackButton />

            {!event ?
                <Text>Loading...</Text>
                :

                <ScrollView ref={scrollRef}>

                    {isPosterLoading &&
                        <View style={styles.spinnerContainer}>
                            <ActivityIndicator size='small' color="#333" style={styles.spinner} />
                        </View>
                    }
                    <TouchableHighlight onPress={() => navigate('Poster', { imageData: event.poster })}>
                        <Animatable.Image
                            animation="fadeIn" easing='ease-out-cubic'
                            style={styles.poster}
                            source={{ uri: event.poster }}
                            onLoad={() => setIsPosterLoading(false)}
                            onError={() => setIsPosterLoading(false)}
                        />
                    </TouchableHighlight>

                    <View style={styles.detailsContainer}>

                        <Animatable.View animation="fadeInUp" easing='ease-out-expo' delay={100}>
                            <View style={styles.eventTypeButton}>
                                <Text style={styles.eventTypeText} >{event.event_type}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>{event.title}</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Entypo name="calendar" size={24} color="black" />
                                <View style={styles.textCon}>
                                    <Text style={{ fontWeight: 'bold' }}>{format(parseISO(event.start_date), "MMMM - dd - Y")}</Text>
                                    <Text>Saturday, 4:00 PM - 10:00 PM</Text>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => scrollRef.current.scrollToEnd({ animated: true })}>
                                <View style={styles.flexRow} >
                                    <Entypo name="location" size={24} color="black" />
                                    {venue ? (
                                        <View style={styles.textCon}>
                                            <Text style={{ fontWeight: 'bold' }}>{venue?.title}</Text>
                                            <Text>{venue?.address}</Text>
                                        </View>
                                    ) : null}
                                </View>
                            </TouchableOpacity>

                            <Divider />

                        </Animatable.View>

                        {/* <Animatable.View animation="slideInUp" delay={200}>
                        </Animatable.View> */}

                        <Animatable.View animation="fadeInUp" easing='ease-out-expo' delay={300}>
                            <View style={styles.organizerContainer}>
                                <Image style={styles.organizerImage} source={{ uri: "https://randomuser.me/api/portraits/thumb/men/7.jpg" }} />
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={[styles.header, { marginBottom: 2 }]}>{event.organizer}</Text>
                                    <Text style={styles.subText}>Organizer</Text>
                                </View>
                            </View>
                            <View style={{ paddingBottom: 40 }}>
                                <Text style={[styles.header, { marginBottom: 6 }]}>About Event</Text>
                                <Text style={{ fontSize: 16 }}>{event.description}</Text>
                            </View>

                            {
                                venue?.coordinates &&
                                <Map coordinates={venue.coordinates} title={venue.title} />
                            }

                        </Animatable.View>
                    </View>

                </ScrollView>
            }

            <Animatable.View style={styles.bottomTab} animation='slideInUp' delay={400} easing='ease-out-expo' >
                <View style={styles.shareBtnCon}>
                    <TouchableOpacity style={styles.shareBtn}>
                        <Entypo name="share" size={30} color="black" />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate('Booking', { itemId: itemId })}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }} >Book Ticket</Text>
                </TouchableOpacity>

                <Text style={styles.price}>${event?.ticket_tiers[1].ticketPrice} /<Ionicons name='person' size={18} /> </Text>

            </Animatable.View>
        </SafeAreaView >
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
        height: 350,
        resizeMode: 'cover',
    },
    spinnerContainer: {
        height: 350,
        width: '100%',
        justifyContent: 'center',
        position: 'absolute'
    },
    detailsContainer: {
        paddingHorizontal: '4%',
        marginBottom: 140
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
    locationTextCon: {
        marginLeft: 10
    },
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
    description: {
        borderWidth: 1
    },
    bottomTab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
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
        height: 95,
        paddingTop: 8,
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