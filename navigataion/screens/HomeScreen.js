import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native'
// import { FlashList } from "@shopify/flash-list";
import EventCard from '../../components/EventCard';
import FeaturedEventCard from '../../components/FeaturedEventCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useStoreActions, useStoreState } from 'easy-peasy';
import 'react-native-url-polyfill/auto' // need this for supabase to work 🤷🏽‍♂️
import { supabase } from '../../supabase/supabase';

const HomeScreen = ({ navigation }) => {
    const data = useStoreState((state) => state.events);
    const setEvents = useStoreActions((actions) => actions.setEvents);

    useEffect(() => {
        getEvents()
    }, [])

    async function getEvents() {
        try {
            const { data: Events } = await supabase.from('Events').select('*');
            setEvents(Events);
        } catch (error) {
            console.error(error);
        }
    }

    const eventCard = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('EventDetails', { itemId: item.id })}>
            <EventCard data={item} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View>

                <View style={styles.topContainer} >
                    <View style={styles.searchContainer}>
                        <TextInput style={styles.searchInput} />
                        <Ionicons name='search' size={15} style={styles.searchIcon} />
                    </View>

                    <TouchableOpacity style={styles.locationButton} >
                        <Ionicons style={styles.locationIcon} name='location' size={20} />
                    </TouchableOpacity>
                </View>

                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Featured</Text>
                    <TouchableOpacity><Text>View all</Text></TouchableOpacity>
                </View>
                {/* featured cards are wide */}
                <FeaturedEventCard data={data} />

                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Trending</Text>
                    <TouchableOpacity><Text>View all</Text></TouchableOpacity>
                </View>

                <View>
                    <FlatList
                        data={data}
                        renderItem={eventCard}
                        keyExtractor={item => item.id}
                        horizontal
                        initialNumToRender={5}
                        removeClippedSubviews
                    />
                </View>

                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Nearby</Text>
                    <TouchableOpacity><Text>View all</Text></TouchableOpacity>
                </View>
                <View >
                    <FlatList
                        data={data}
                        renderItem={eventCard}
                        keyExtractor={item => item.id}
                        horizontal
                        initialNumToRender={5}
                        removeClippedSubviews
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 10,
        marginVertical: 6
    },
    searchInput: {
        flex: 1
    },
    searchIcon: {
        position: 'absolute',
        right: 12
    },
    searchContainer: {
        backgroundColor: '#E9EBED',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 35,
        paddingVertical: 4,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginRight: 8
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
        height: 16
    },
    heading: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    },
});