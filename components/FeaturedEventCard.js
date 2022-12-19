import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const FeaturedEventCard = ({ data }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: 'https://source.unsplash.com/random/500×300/?event' }}
            />
            <Text style={styles.caption}>International Concert</Text>
        </TouchableOpacity>
    )
}

export default FeaturedEventCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 140,
        borderWidth: 1,
        borderColor: '#E9EBED',
        borderRadius: 12,
        elevation: 2,
        shadowRadius: 1,
        elevation: 5,
        margin: 2,
        marginHorizontal: 8,
    },
    image: {
        flex: 1,
        height: 140,
        resizeMode: "cover",
        borderRadius: 10,

    },
    caption: {
        color: '#fff',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        left: 15,
        padding: 4,
        backgroundColor: '#00000040',
        borderRadius: 10,
        overflow: 'hidden'
    }
})