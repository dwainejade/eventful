import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';


const EventCard = ({ data }) => {

    const [buttonState, setButtonState] = useState(data.isLiked);

    let buttonColor
    let buttonType
    if (buttonState) {
        buttonColor = '#fff';
        buttonType = 'heart'
    } else {
        buttonColor = '#fff';
        buttonType = 'heart-outline'
    }

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.cardTop}>
                <Image
                    style={styles.image}
                    source={{ uri: data.poster }}
                />
                <Pressable style={styles.likeButton} onPress={() => setButtonState(!buttonState)}>
                    <Ionicons name={buttonType} size={22} color={buttonColor} />
                </Pressable>
                <Text style={styles.date}>17 Aug</Text>
            </View>
            <View style={styles.cardBottom}>
                <Text style={styles.title}>{data.title}</Text>
                <Pressable style={styles.eventTypeButton}>
                    <Text style={styles.eventTypeText} >{data.eventType}</Text>
                </Pressable>
                <Text style={styles.address}>{data.address}</Text>
            </View>
        </TouchableOpacity>
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
        elevation: 5,
        margin: 2,
        marginHorizontal: 8
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
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        padding: 8,
    },
    date: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 60,
        height: 20,
        fontSize: 14,
        color: '#333',
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        overflow: 'hidden',
        padding: 1
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