import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import EventCard from '../../components/EventCard';
import FeaturedEventCard from '../../components/FeaturedEventCard';
import { useStoreActions, useStoreState } from 'easy-peasy';
import 'react-native-url-polyfill/auto' // need this for supabase to work 🤷🏽‍♂️
import { supabase } from '../../supabase/supabase';

const HomeScreen = ({ navigation }) => {
    const session = useStoreState((state) => state.session);
    const events = useStoreState((state) => state.events);
    const setEvents = useStoreActions((actions) => actions.setEvents);
    const likedEvents = useStoreState((state) => state.likedEvents);
    const setLikedEvents = useStoreActions((actions) => actions.setLikedEvents);
    const [address, setAddress] = useState('')
    const userId = session.user.identities[0].id

    useEffect(() => {
        getEvents()
        getVenue(events.venue)
        getLikes(userId)
    }, [session])


    const getEvents = useCallback(async () => {
        let { data: Events, error } = await supabase
            .from('Events')
            .select('*')
            .order('start_date');
        setEvents(Events);
        if (error) {
            // console.log("getEvents error: ", error)
            return null
        }
    }, []);

    const getVenue = useCallback(async (id) => {
        let { data: Venue, error } = await supabase
            .from('Venue')
            .select('address')
            .eq('id', id)
        if (Venue) setAddress(Venue[0].address)
        if (error) {
            // console.log("getVenue error: ", error)
            return null
        }
    }, []);

    const getLikes = useCallback(async (id) => {
        let { data: profile, error } = await supabase
            .from('profiles')
            .select('liked_events')
            .eq('id', id)
        if (profile) setLikedEvents(profile[0].liked_events)
        if (error) {
            // console.log("getLikes error: ", error)
            return null
        }
    }, []);


    const eventCard = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('EventDetails', { itemId: item.id })}>
            <EventCard data={item} userId={userId} address={address} />
        </TouchableOpacity>
    );

    const likedCards = ({ item }) => (
        likedEvents.includes(item.id) &&
        <TouchableOpacity
            onPress={() => navigation.navigate('EventDetails', { itemId: item.id })}>
            <EventCard data={item} userId={userId} address={address} />
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.mainContainer}>
                <View>

                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Featured</Text>
                        <TouchableOpacity><Text>View all</Text></TouchableOpacity>
                    </View>
                    {/* featured cards are wide */}
                    <FeaturedEventCard data={events} />

                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Upcoming</Text>
                        <TouchableOpacity><Text>View all</Text></TouchableOpacity>
                    </View>

                    <View style={styles.listCon}>
                        <FlatList
                            data={events}
                            renderItem={eventCard}
                            keyExtractor={item => item.id}
                            horizontal
                            initialNumToRender={5}
                            removeClippedSubviews
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={216}
                            snapToAlignment='start'
                        />
                    </View>

                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Liked</Text>
                        <TouchableOpacity><Text>View all</Text></TouchableOpacity>
                    </View>
                    <View >
                        <FlatList
                            data={events}
                            renderItem={likedCards}
                            keyExtractor={item => item.id}
                            horizontal
                            initialNumToRender={5}
                            removeClippedSubviews
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={216}
                            snapToAlignment='start'
                        />

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    mainContainer: {
    },
    locationButton: {
        height: 35,
        width: 35,
        backgroundColor: '#E9EBED',
        borderRadius: 8,
        padding: 7,
    },
    locationIcon: {
        alignSelf: 'center'
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 2,
        marginHorizontal: 6,
        marginTop: 10,
        height: 16
    },
    heading: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    },
    listCon: {
        width: '100%',
        height: 230
    }
});