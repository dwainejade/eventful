import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../supabase/supabase';
import { format, parseISO } from "date-fns";
import * as Animatable from 'react-native-animatable';

const EventCard = ({ data, index }) => {
    const [buttonState, setButtonState] = useState(data.isLiked);
    const [isLoading, setIsLoading] = useState(true)
    const [address, setAddress] = useState('')
    const MAX_LENGTH = 30;
    let buttonColor
    let buttonType
    if (buttonState) {
        buttonColor = '#fff';
        buttonType = 'heart'
    } else {
        buttonColor = '#fff';
        buttonType = 'heart-outline'
    }

    useEffect(() => {
        getVenue(data.venue)
    }, [])


    const getVenue = useCallback(async (id) => {
        let { data: Venue, error } = await supabase
            .from('Venue')
            .select('address')
            .eq('id', id)
        if (Venue) setAddress(Venue[0].address)

        if (error) {
            return null
        }

    }, []);

    return (
        <>
            {isLoading &&
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size='small' color="#333" />
                </View>
            }
            <Animatable.View style={styles.container} animation='zoomIn' easing="ease-out-circ" onAnimationBegin={() => setIsLoading(false)}>
                <View style={styles.cardTop}>
                    <Image
                        style={styles.image}
                        source={{ uri: data.poster }}
                    />
                    <Pressable style={styles.likeButton} onPress={() => setButtonState(!buttonState)}>
                        <Ionicons name={buttonType} size={22} color={buttonColor} />
                    </Pressable>
                    <Text style={styles.date}>{format(parseISO(data.start_date), "dd MMM")}</Text>
                </View>
                <View style={styles.cardBottom}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Pressable style={styles.eventTypeButton}>
                        <Text style={styles.eventTypeText} >{data.event_type}</Text>
                    </Pressable>
                    <Text style={styles.address}><Ionicons name='location' size={10} />{address.length > MAX_LENGTH ? `${address.substring(0, MAX_LENGTH)}...` : address}</Text>
                </View>
            </Animatable.View>
        </>
    )
}


export default EventCard

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 220,
        borderWidth: 1,
        borderColor: '#E9EBED',
        borderRadius: 12,
        shadowRadius: 1,
        elevation: 5,
        margin: 2,
        marginHorizontal: 8
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        top: 100
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
        fontSize: 12,
        color: '#333',
    }
})