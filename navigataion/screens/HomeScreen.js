import * as React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import EventCard from '../../components/EventCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeaturedEventCard from '../../components/FeaturedEventCard';

const data = require('../../data/MOCK_DATA.json');

const HomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

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

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {data.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => navigation.navigate('EventDetails', { itemId: item.id })}>
                            <EventCard
                                data={item}
                            />
                        </TouchableOpacity>
                    )
                    )}
                </ScrollView>

                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Nearby</Text>
                    <TouchableOpacity><Text>View all</Text></TouchableOpacity>
                </View>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        data.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => navigation.navigate('EventDetails', { itemId: item.id })}>
                                <EventCard
                                    data={item}
                                />
                            </TouchableOpacity>
                        )
                        )}
                </ScrollView>

            </ScrollView>
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