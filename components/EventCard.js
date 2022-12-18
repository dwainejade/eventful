import React, { useState } from 'react'
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const EventCard = () => {
    const [buttonState, setButtonState] = useState(false);

    let buttonColor
    let buttonType
    if (buttonState) {
        buttonColor = 'red';
        buttonType = 'heart'
    } else {
        buttonColor = '#fff';
        buttonType = 'heart-outline'
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardTop}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' }}
                />
                <Pressable style={styles.likeButton} onPress={() => setButtonState(!buttonState)}>
                    <Ionicons name={buttonType} size={20} color={buttonColor} />
                </Pressable>

            </View>
            <View style={styles.cardBottom}>
                <Text style={styles.title}>Lorem Concert</Text>
                <Pressable style={styles.eventTypeButton}>
                    <Text style={styles.eventTypeText} >Music</Text>
                </Pressable>
                <Text style={styles.address}>2920 Zoo Dr, Brookyn, NY 11225</Text>
            </View>
        </View>
    )
}

export default EventCard

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 220,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 12,
        elevation: 2,
        shadowRadius: 1,
        elevation: 5
    },
    cardTop: {
        height: '65%'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    likeButton: {
        position: 'absolute',
        left: 10,
        top: 10
    },
    cardBottom: {
        backgroundColor: '#fff',
        height: 80,
        padding: 8,
        flex: 1,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    eventTypeButton: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 12,
        alignSelf: 'left',
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    eventTypeText: {
        fontSize: 11,
    },
    address: {
        fontSize: 10,
        color: '#333',
    }
})