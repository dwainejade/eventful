import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.backBtnCon}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Entypo name="chevron-small-left" size={30} color="#262A2C" />
            </TouchableOpacity>
        </View>
    )
}

export default BackButton

const styles = StyleSheet.create({
    backBtnCon: {
        position: 'absolute',
        zIndex: 9,
        top: 50,
        left: 15,
    },
    backBtn: {
        backgroundColor: '#E9EBED',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey'
    }
})