import { StyleSheet, View, Image } from 'react-native'
import BackButton from '../../components/BackButton';


const PosterScreen = ({ naviagtion, route }) => {

    return (
        <View style={styles.container}>
            <BackButton />

            <Image style={styles.poster}
                source={{ uri: route.params?.imageData }} />
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
    }
})