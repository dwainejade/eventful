import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../components/BackButton'
// import Divider from '../../components/Divider'
import * as Animatable from 'react-native-animatable';
import { Entypo, Ionicons } from '@expo/vector-icons';

const BookingScreen = () => {
    const [amount, setAmount] = useState(0)


    return (
        <SafeAreaView style={styles.container}>
            <BackButton />
            <Text style={styles.header}>Buy Ticket</Text>

            {/* <Text style={styles.subHeader}>Ticket Type</Text> */}
            {/* <View style={styles.ticketTypeBtnCon}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: vip ? 'black' : 'white' }]} onPress={() => setVip(true)} >
                    <Text style={{ color: vip ? 'white' : 'black', fontWeight: 'bold' }} >VIP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, { backgroundColor: vip ? 'white' : 'black' }]} onPress={() => setVip(false)}>
                    <Text style={{ color: vip ? 'black' : 'white', fontWeight: 'bold' }} >Economy</Text>
                </TouchableOpacity>
            </View> */}

            <Text style={styles.subHeader}>Seats</Text>

            <View style={styles.choiceCon}>
                <Text style={styles.type}>VIP</Text>
                <View style={styles.controlsCon}>
                    <Pressable onPress={() => setAmount(amount - 1)}>
                        <Text style={{ fontSize: 16 }}>-</Text>
                    </Pressable>

                    <Text style={{ fontSize: 16 }} type='number' value={amount}>{amount}</Text>

                    <Pressable onPress={() => setAmount(amount + 1)}>
                        <Text style={{ fontSize: 16 }}>+</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.choiceCon}>
                <Text style={styles.type}>General Admission</Text>
                <View style={styles.controlsCon}>
                    <Pressable>
                        <Text style={{ fontSize: 16 }} >-</Text>
                    </Pressable>
                    <Text style={{ fontSize: 16 }}>0</Text>
                    <Pressable>
                        <Text style={{ fontSize: 16 }}>+</Text>
                    </Pressable>
                </View>
            </View>
            <Animatable.View style={styles.bottomTab} animation='slideInUp' delay={400} easing='ease-out-expo' >

                <Text style={styles.price}>$180</Text>
                <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate('Booking')}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }} >Checkout</Text>
                </TouchableOpacity>

            </Animatable.View>
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
    },
    choiceCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowRadius: 1,
        elevation: 5,
        marginVertical: 8,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    controlsCon: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 90
    },
    type: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    bottomTab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        left: '-2.5%',
        width: '105%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E9EBED',
        borderBottomColor: 'transparent',
        borderRadius: 30,
        shadowRadius: 1,
        elevation: 5,
        height: 95,
        paddingTop: 8,
        paddingBottom: 30
    },
    shareBtnCon: {
        width: '25%'
    },
    shareBtn: {
        backgroundColor: '#E9EBED',
        padding: 4,
        borderRadius: 20,
        width: 40,
        height: 40,
        marginLeft: 20
    },
    bookBtn: {
        width: '45%',
        height: 45,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#000',
        borderRadius: 25,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '25%',
        height: 40,
        paddingVertical: 8,
        textAlign: 'center',
    }
})