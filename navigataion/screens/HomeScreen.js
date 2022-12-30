import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import EventCard from '../../components/EventCard';
import FeaturedEventCard from '../../components/FeaturedEventCard';
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

    const eventCard = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('EventDetails', { itemId: item.id })}>
            <EventCard data={item} index={index} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.mainContainer}>
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

                <View style={styles.listCon}>
                    <FlatList
                        data={data}
                        renderItem={eventCard}
                        keyExtractor={item => item.id}
                        horizontal
                        initialNumToRender={5}
                        removeClippedSubviews
                        showsHorizontalScrollIndicator={false}
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
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainContainer: {
        // marginTop: 30
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