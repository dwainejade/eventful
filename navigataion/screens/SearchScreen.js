import React from 'react'
import { StyleSheet, SafeAreaView, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import SearchBar from '../../components/SearchBar'
import { useStoreActions, useStoreState } from 'easy-peasy';
import EventCard from '../../components/EventCard';

const SearchScreen = () => {
    const data = useStoreState((state) => state.searchResults);
    const setSearchResults = useStoreActions((actions) => actions.setSearchResults);

    const eventCard = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('EventDetails', { itemId: item.id })}>
            <EventCard data={item} index={index} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>

            <SearchBar setSearchResults={setSearchResults} />

            <View style={styles.listCon}>
                <FlatList
                    data={data}
                    renderItem={eventCard}
                    keyExtractor={item => item.id}
                    initialNumToRender={5}
                    removeClippedSubviews
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainContainer: {
        // flex: 1
    },
})