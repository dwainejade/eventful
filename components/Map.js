import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native'
import { Marker } from 'react-native-maps';

const Map = ({ coordinates }) => {
    if (!coordinates) {
        return null;
    }
    const latitude = coordinates[0]
    const longitude = coordinates[1]

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
            ><Marker coordinate={{ latitude: latitude, longitude: longitude }} />
            </MapView>
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