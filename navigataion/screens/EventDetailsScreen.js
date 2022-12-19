import React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native'

const EventDetailsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text>EventDetailsScreen</Text>

            </ScrollView>
        </SafeAreaView>
    )
}

export default EventDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
})