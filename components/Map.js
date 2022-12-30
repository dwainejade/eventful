import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Linking, StyleSheet, View } from 'react-native'
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = ({ coordinates }) => {
    if (!coordinates) {
        return null;
    }
    const latitude = coordinates[0]
    const longitude = coordinates[1]

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    // let text = 'Waiting..';
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (location) {
    //     text = JSON.stringify(location);
    // }

    const handlePress = () => {
        let url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[0]},${coordinates[1]}`;
        // `http://maps.apple.com/?saddr=Current+Location&daddr=${coordinates[0]},${coordinates[1]}`;

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log(`Can't open URL: ${url}`);
            }
        });
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003,
                }}
            >
                <Marker coordinate={{ latitude: latitude, longitude: longitude }} pinColor='green' />
                <Marker coordinate={{ latitude: location?.coords.latitude, longitude: location?.coords.longitude }} pinColor='red' />
            </MapView>
            <Button title="Get Directions" onPress={handlePress} />
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        height: 200,
        width: '100%',
    }
})