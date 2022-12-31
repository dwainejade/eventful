import { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import BackButton from '../../components/BackButton';
import * as Animatable from 'react-native-animatable';


const PosterScreen = ({ route }) => {
    const { imageData } = route.params;
    const [isPosterLoading, setIsPosterLoading] = useState(true)

    return (
        <View style={styles.container}>
            <BackButton />

            {isPosterLoading &&
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size='small' color="#333" />
                </View>
            }

            <Animatable.Image animation='slideInDown' duration={1200} easing='ease-out-cubic' useNativeDriver
                style={styles.poster}
                source={{ uri: imageData }}
                onLoad={() => setIsPosterLoading(false)}
                onError={() => setIsPosterLoading(false)}
            />
        </View >
    )
}

export default PosterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    poster: {
        flex: 1,
        resizeMode: 'contain',
    },
    spinnerContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        position: 'absolute'
    }
})