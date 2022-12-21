import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../components/BackButton'
import Divider from '../../components/Divider'

const BookingScreen = () => {
    const [vip, setVip] = useState(false);
    // TODO
    // format date to 'd, MMM' (ex: '17 Aug')

    return (
        <SafeAreaView style={styles.container}>
            <BackButton />
            <Text style={styles.header}>Buy Ticket</Text>

            <Text style={styles.subHeader}>Ticket Type</Text>
            <View style={styles.ticketTypeBtnCon}>

                <TouchableOpacity style={[styles.btn, { backgroundColor: vip ? 'black' : 'white' }]} onPress={() => setVip(true)} >
                    <Text style={{ color: vip ? 'white' : 'black', fontWeight: 'bold' }} >VIP</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, { backgroundColor: vip ? 'white' : 'black' }]} onPress={() => setVip(false)}>
                    <Text style={{ color: vip ? 'black' : 'white', fontWeight: 'bold' }} >Economy</Text>
                </TouchableOpacity>

            </View>

            <Text style={styles.subHeader}>Seats</Text>

            <Divider />

        </SafeAreaView>


    )
}

export default BookingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 55,
        marginTop: 8
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
        color: '#2F3437'
    },
    ticketTypeBtnCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    btn: {
        width: '49%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 25,
        borderWidth: 1
    }
})