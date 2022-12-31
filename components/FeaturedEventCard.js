import he from 'date-fns/esm/locale/he/index.js';
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable';

const FeaturedEventCard = ({ data }) => {
    const [isLoading, setIsLoading] = useState(true)
    return (
        <>
            <TouchableOpacity style={styles.container}>
                {isLoading &&
                    <View style={styles.spinnerContainer}>
                        <ActivityIndicator size='small' color="#333" />
                    </View>
                }
                <Animatable.Image animation='zoomInRight' duration={1200} easing="ease-out-circ" onAnimationBegin={() => setIsLoading(false)}
                    style={styles.image}
                    source={{ uri: 'https://source.unsplash.com/random/500×300/?event' }}
                />
                <Text style={styles.caption}>International Concert</Text>
            </TouchableOpacity>
        </>
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
        margin: 2,
        marginHorizontal: 8,
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        top: 30,
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