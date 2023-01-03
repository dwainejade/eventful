import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../supabase/supabase';
import { format, parseISO } from "date-fns";
import { useStoreState, useStoreActions } from 'easy-peasy';
import * as Animatable from 'react-native-animatable';

const EventCard = ({ data, index, address, updateServer }) => {
    const [isLoading, setIsLoading] = useState(true)
    const likedIds = useStoreState((state) => state.likedIds);
    const addLikedId = useStoreActions((actions) => actions.addLikedId);
    const removeLikedId = useStoreActions((actions) => actions.removeLikedId);
    const MAX_LENGTH = 30;

    const handleLike = () => {
        addLikedId(data.id)
    }
    const handleUnlike = () => {
        removeLikedId(data.id)
    }

    // useEffect(() => {
    //     getVenue(data.venue)
    // }, [])


    // const getVenue = useCallback(async (id) => {
    //     let { data: Venue, error } = await supabase
    //         .from('Venue')
    //         .select('address')
    //         .eq('id', id)
    //     if (Venue) setAddress(Venue[0].address)

    //     if (error) {
    //         return null
    //         // console.log('error getting address', error)
    //     }

    // }, []);

    return (
        <>
            {isLoading &&
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size='small' color="#333" />
                </View>
            }
            <Animatable.View
                style={styles.cardContainer}
                animation='fadeInRight' easing="ease-out-circ"
                onAnimationBegin={() => setIsLoading(false)}>

                <View style={styles.cardLeft}>
                    <Image
                        style={styles.image}
                        source={{ uri: data.poster }}
                    />

                    {likedIds?.includes(data.id) ?
                        <Pressable style={styles.likeButton} onPress={() => handleUnlike()}>
                            <Ionicons name='heart' size={22} color='tomato' />
                        </Pressable>
                        :
                        <Pressable style={styles.likeButton} onPress={() => handleLike()}>
                            <Ionicons name='heart-outline' size={22} color='#fff' />
                        </Pressable>
                    }

                    <Text style={styles.date}>{format(parseISO(data.start_date), "dd MMM")}</Text>
                </View>
                <View style={styles.cardRight}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Pressable style={styles.eventTypeButton}>
                        <Text style={styles.eventTypeText} >{data.event_type}</Text>
                    </Pressable>
                    <Text style={styles.address}><Ionicons name='location' size={10} />{address}</Text>
                </View>
            </Animatable.View>
        </>
    )
}


export default EventCard

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        top: 100
    },
    cardContainer: {
        height: 150,
        borderWidth: 1,
        borderColor: '#E9EBED',
        borderRadius: 12,
        shadowRadius: 1,
        elevation: 5,
        margin: 4,
        flexDirection: 'row'
    },
    cardLeft: {
        height: '100%',
        width: '40%'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        borderBottomLeftRadius: 12,
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
        backgroundColor: '#fff',
        overflow: 'hidden',
        padding: 1
    },
    cardRight: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
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