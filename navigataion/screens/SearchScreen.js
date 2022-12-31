import React from 'react'
import { StyleSheet, SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Text, Image } from 'react-native'
import SearchBar from '../../components/SearchBar'
import { useStoreActions, useStoreState } from 'easy-peasy';
import EventCard from '../../components/EventCard';
import { useNavigation } from '@react-navigation/native';
import bg from '../../assets/city.png'

const SearchScreen = () => {
    const data = useStoreState((state) => state.searchResults);
    const setSearchResults = useStoreActions((actions) => actions.setSearchResults);
    const { navigate } = useNavigation()

    const eventCard = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => navigate('EventDetails', { itemId: item.id })}>
            <EventCard data={item} index={index} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>

            <SearchBar setSearchResults={setSearchResults} />

            <View style={styles.listCon}>
                {data.length ?
                    <FlatList
                        data={data}
                        renderItem={eventCard}
                        keyExtractor={item => item.id}
                        initialNumToRender={10}
                        removeClippedSubviews
                        showsHorizontalScrollIndicator={false}
                    />
                    :
                    <Image source={require('../../assets/city.png')} style={styles.bg} />
                }

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
    },
    bg: {
        flex: 1,
        resizeMode: "cover",
        minHeight: 360,
        width: '100%',
        marginTop: '20%'
    }
})