import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../supabase/supabase';

const SearchBar = ({ setSearchResults }) => {
    const [searchValue, setSearchValue] = useState('')


    const handleSearch = async () => {
        const searchQuery = searchValue; // get the search query from the TextInput component

        let { data: Events, error } = await supabase
            .from('Events')
            .select()
            .textSearch('title', searchQuery)
            .then((res) => {
                setSearchResults(res.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View styles={styles.topContainer}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput}
                    placeholder='Search'
                    value={searchValue}
                    onChangeText={(text) => setSearchValue(text)}
                    onSubmitEditing={() => handleSearch()}
                    autoCapitalize={false}
                />
                <TouchableOpacity onPress={() => handleSearch()} style={styles.searchIcon}>
                    <Ionicons name='search' size={15} />
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default SearchBar;

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#E9EBED',
        flexDirection: 'row',
        alignItems: 'center',
        height: 35,
        paddingVertical: 4,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginHorizontal: 8,
        marginBottom: 8,
    },
    searchIcon: {
        position: 'absolute',
        right: 12,
    },
    searchInput: {
        flex: 1,
        zIndex: 4
    },
})