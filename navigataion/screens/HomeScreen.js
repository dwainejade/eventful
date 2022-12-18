import * as React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import EventCard from '../../components/EventCard';

const data = require('../../data/MOCK_DATA.json');

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text>Featured</Text>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {data.map((item) => (
                        <EventCard
                            data={item}
                            key={item.id}
                        />
                    )
                    )}
                </ScrollView>
                <Text>Trending</Text>

                <Text>Nearby</Text>

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    }
});