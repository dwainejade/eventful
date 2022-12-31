import React from 'react'
import { StyleSheet, SafeAreaView, View, FlatList, TouchableOpacity, Image } from 'react-native'
import SearchBar from '../../components/SearchBar'
import { useStoreActions, useStoreState } from 'easy-peasy';
import SearchEventCard from '../../components/SearchEventCard';
import { useNavigation } from '@react-navigation/native';


const SearchScreen = () => {
    const data = useStoreState((state) => state.searchResults);
    const setSearchResults = useStoreActions((actions) => actions.setSearchResults);
    const { navigate } = useNavigation()

    const searchEventCard = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => navigate('EventDetails', { itemId: item.id })}>
            <SearchEventCard data={item} index={index} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>

            <SearchBar setSearchResults={setSearchResults} />

            {data.length ?

                <FlatList
                    data={data}
                    renderItem={searchEventCard}
                    keyExtractor={item => item.id}
                    initialNumToRender={10}
                    removeClippedSubviews
                    showsHorizontalScrollIndicator={false}
                />

                :
                <Image source={require('../../assets/city.png')} style={styles.bg} />
            }
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