import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { format, parseISO } from "date-fns";
import * as Animatable from 'react-native-animatable';
import { supabase } from '../supabase/supabase';

const EventCard = ({ data, index, updateServer }) => {
    const [isLoading, setIsLoading] = useState(true)
    const likedIds = useStoreState((state) => state.likedIds);
    const addLikedId = useStoreActions((actions) => actions.addLikedId);
    const removeLikedId = useStoreActions((actions) => actions.removeLikedId);
    const [venue, setVenue] = useState('')
    const MAX_LENGTH = 30;

    useEffect(() => {
        updateServer(likedIds);
        getVenue(data.venue)
    }, [likedIds]);

    // get venues to add display address and/or titles on cards
    const getVenue = useCallback(async (id) => {
        if (!id) return
        let { data: Venue, error } = await supabase
            .from('Venue')
            .select('*')
            .eq('id', id)
        if (Venue) {
            setVenue(Venue[0])
        }
        if (error) {
            // console.log("getVenue error: ", error)
            return null
        }
    }, [data]);

    // console.log('EventCard:', event.address)

    const handleLike = () => {
        addLikedId(data.id)
    }
    const handleUnlike = () => {
        removeLikedId(data.id)
    }

    return (
        <>
            {isLoading &&
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size='small' color="#333" />
                </View>
            }
            <Animatable.View style={styles.container} animation='fadeInRight' delay={50 * index} easing="ease-out-circ" onAnimationBegin={() => setIsLoading(false)}>
                <View style={styles.cardTop}>
                    <View style={{ overflow: 'hidden' }}>

                        <Image
                            style={styles.image}
                            source={{ uri: data.poster }}
                        />
                    </View>

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

                <View style={styles.cardBottom}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Pressable style={styles.eventTypeButton}>
                        <Text style={styles.eventTypeText} >{data.event_type}</Text>
                    </Pressable>
                    <Text style={styles.address}><Ionicons name='location' size={10} />{venue?.address?.length > MAX_LENGTH ? `${venue.address.substring(0, MAX_LENGTH)}...` : venue.address}</Text>
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
        height: 140
    },
    image: {
        height: 180,
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