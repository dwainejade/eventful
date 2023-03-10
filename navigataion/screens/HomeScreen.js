import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import EventCard from '../../components/EventCard';
import FeaturedEventCard from '../../components/FeaturedEventCard';
import { useStoreActions, useStoreState } from 'easy-peasy';
import 'react-native-url-polyfill/auto' // need this for supabase to work 🤷🏽‍♂️
import { supabase } from '../../supabase/supabase';
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({ navigation }) => {
    const session = useStoreState((state) => state.session);
    const events = useStoreState((state) => state.events);
    const setEvents = useStoreActions((actions) => actions.setEvents);
    const likedIds = useStoreState((state) => state.likedIds);
    const setLikedIds = useStoreActions((actions) => actions.setLikedIds);
    const likedEvents = useStoreState((state) => state.likedEvents);
    const setLikedEvents = useStoreActions((actions) => actions.setLikedEvents);
    const featuredId = useStoreState((state) => state.featuredId);
    const [featuredEvent, setFeaturedEvent] = useState({});
    const userId = session.user.identities[0].id;

    useEffect(() => {
        getEvents()
        getLikes(userId);
    }, [])

    useEffect(() => {
        searchEvents(likedIds)
        getFeaturedEvent()
    }, [likedIds])

    // save likedIds to server
    const updateServer = async () => {
        let { data, error } = await supabase
            .from('profiles')
            .update({ liked_events: likedIds })
            .eq('id', userId)
    }

    //  get all events
    const getEvents = useCallback(async () => {
        let { data: Events, error } = await supabase
            .from('Events')
            .select('*')
            // .range(0, range) // TODO add pagination
            .order('start_date');
        setEvents(Events);
        if (error) {
            // console.log("getEvents error: ", error)
            return null
        }
    }, []);

    const getFeaturedEvent = async () => {
        let fId
        let { data: Featured_Events } = await supabase
            .from('Featured_Events')
            .select()
        if (Featured_Events) {
            fId = Featured_Events[0].event_id
        }
        let { data: Events } = await supabase
            .from('Events')
            .select()
            .eq('id', fId)
        if (Events) {
            setFeaturedEvent(Events[0])
        }
    }

    // get array of liked ids from profiles table
    const getLikes = async (id) => {
        let { data: Profile, error } = await supabase
            .from('profiles')
            .select('liked_events')
            .eq('id', id)
        if (Profile) {
            setLikedIds(Profile[0].liked_events)
        }
        if (error) {
            // console.log("getLikes error: ", error)
            return null
        }
    };

    // search events and match with likedIds
    const searchEvents = async (ids) => {
        let { data, error } = await supabase
            .from('Events')
            .select()
            .in('id', ids)
            .order('id')
        if (data) setLikedEvents(data)

        if (error) {
            console.error(error);
            return null;
        }
    };


    const eventCard = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('EventDetails', { itemId: item.id })}>
            <EventCard data={item} userId={userId} index={index} updateServer={updateServer} searchEvents={searchEvents} />
        </TouchableOpacity>
    );

    const likedCards = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('EventDetails', { itemId: item.id })}>
            <EventCard data={item} userId={userId} updateServer={updateServer} searchEvents={searchEvents} />
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.mainContainer}>
                <View>

                    <Animatable.View animation='fadeInRight' duration={500} easing="ease-out-circ"
                        style={styles.headingContainer}>
                        <Text style={styles.heading}>Featured</Text>
                        <TouchableOpacity><Text>View all</Text></TouchableOpacity>
                    </Animatable.View>

                    {/* featured cards are wide */}
                    <FeaturedEventCard data={featuredEvent} />


                    <Animatable.View animation='fadeInRight' duration={500} delay={500} easing="ease-out-circ"
                        style={styles.headingContainer}>
                        <Text style={styles.heading}>Upcoming</Text>
                        <TouchableOpacity><Text>View all</Text></TouchableOpacity>
                    </Animatable.View>

                    <Animatable.View animation='fadeInRight' delay={600} easing="ease-out-circ"
                        style={styles.listCon}>
                        <FlatList
                            data={events}
                            renderItem={eventCard}
                            keyExtractor={item => item.id}
                            horizontal
                            initialNumToRender={10}
                            removeClippedSubviews
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={216}
                            snapToAlignment='start'
                        />
                    </Animatable.View>
                    {likedEvents &&
                        <>
                            <Animatable.View animation='fadeInRight' duration={500} delay={1000} easing="ease-out-circ"
                                style={styles.headingContainer}>
                                <Text style={styles.heading}>Liked</Text>
                                <TouchableOpacity><Text>View all</Text></TouchableOpacity>
                            </Animatable.View>
                            <Animatable.View animation='fadeInRight' delay={1000} >
                                <FlatList
                                    data={likedEvents}
                                    renderItem={likedCards}
                                    keyExtractor={item => item.id}
                                    horizontal
                                    // initialNumToRender={20}
                                    removeClippedSubviews
                                    showsHorizontalScrollIndicator={false}
                                    snapToInterval={216}
                                    snapToAlignment='start'
                                />
                            </Animatable.View>
                        </>
                    }

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