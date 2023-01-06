import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../components/BackButton'
import { supabase } from '../../supabase/supabase';
import * as Animatable from 'react-native-animatable';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Entypo } from '@expo/vector-icons';
import Divider from '../../components/Divider';

const BookingScreen = ({ navigation, route }) => {
    const { itemId } = route.params
    const [total, setTotal] = useState(0)
    const [ticketState, setTicketState] = useState([])
    const setTicketFooter = useStoreActions((actions) => actions.setTicketFooter);

    useEffect(() => {
        getPrices(itemId)
    }, [itemId])

    useEffect(() => {
        setTotal(calculateTotal());
        setTicketFooter(ticketState)
    }, [ticketState]);

    // TODO
    // add states to store
    // add max quantity based on tickets left to purchase


    const getPrices = async (id) => {
        let { data: Prices, error } = await supabase
            .from('Events')
            .select('ticket_tiers')
            .eq('id', id)

        if (Prices) {
            let prices = Prices[0].ticket_tiers
            setTicketState(prices.map((price) => ({
                type: price.tierName,
                quantity: 0,
                price: price.ticketPrice,
                details: price.ticketDetails
            })))
        }
        if (error) {
            console.log("getEvents error: ", error)
            return null
        }
    };

    const calculateTotal = () => {
        let total = 0;
        ticketState.forEach(ticket => {
            total += ticket.price * ticket.quantity;
        });
        return total;
    };

    const adjustQuantity = (selectedTicketType, quantity) => {
        setTicketState(
            ticketState.map(ticket => {
                if (ticket.type === selectedTicketType) {
                    return {
                        ...ticket,
                        quantity: ticket.quantity + quantity
                    };
                }
                return ticket;
            })
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <BackButton />

            <Text style={styles.header}>Buy Ticket</Text>
            <Text style={styles.subHeader}>Tiers</Text>

            <ScrollView>
                {ticketState?.map((ticket, i) => (
                    <View style={styles.choiceCon} key={i}>

                        <View style={styles.choiceTop}>
                            <Text style={{ fontSize: 17, width: '70%' }}>{ticket.type}</Text>

                            <View style={styles.controlsCon}>
                                <Pressable onPress={() => { if (ticket.quantity > 0) adjustQuantity(ticket.type, -1) }}>
                                    <Entypo name="minus" size={20} color="black" />
                                </Pressable>

                                <Text style={{ fontSize: 20 }}>{ticket.quantity}</Text>

                                <Pressable onPress={() => { if (ticket.quantity < 100) adjustQuantity(ticket.type, 1) }}>
                                    <Entypo name="plus" size={20} color="black" />
                                </Pressable>
                            </View>
                        </View>

                        <Divider />

                        <View style={styles.choiceBottom}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }} >${ticket.price}</Text>
                            <Text>{ticket.details}</Text>
                        </View>

                    </View>
                ))}
            </ScrollView>
            <Animatable.View style={styles.bottomTab} animation='slideInRight' easing='ease-out-expo' >
                <Text style={styles.price}>${total}</Text>
                <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate('Ticket', { ticketInfo: ticketState })}>
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
        marginTop: 15
    },
    subHeader: {
        fontSize: 20,
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
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowRadius: 1,
        elevation: 5,
        marginVertical: 8,
        paddingVertical: 20,
        paddingHorizontal: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    choiceTop: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    choiceBottom: {
        justifyContent: 'space-evenly'
    },
    controlsCon: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 90
    },
    bottomTab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        left: '-2.5%',
        width: '110%',
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
    bookBtn: {
        width: '50%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 25,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '30%',
        height: 40,
        paddingVertical: 8,
        textAlign: 'center'
    }
})