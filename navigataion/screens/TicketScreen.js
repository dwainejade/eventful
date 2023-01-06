import { StyleSheet, Text, View, SafeAreaView, ImageBackground, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import QRCode from '../../components/QRCodeGenerator'
import Divider from '../../components/Divider'
import { useStoreActions, useStoreState } from 'easy-peasy';
import BackButton from '../../components/BackButton';
import CryptoJS from 'crypto-js';
import * as Animatable from 'react-native-animatable';

const TicketScreen = ({ navigation, route }) => {
    const ticketHeader = useStoreState((state) => state.ticketHeader)
    const ticketFooter = useStoreState((state) => state.ticketFooter)
    const tickets = useStoreState((state) => state.tickets)
    const setTickets = useStoreActions((actions) => actions.setTickets);
    const [loading, setLoading] = useState(true)

    function createTickets() {
        let ticketObjects = [];
        for (let i = 0; i < ticketFooter.length; i++) {
            for (let j = 0; j < ticketFooter[i].quantity; j++) {

                let ticketNumber = CryptoJS.AES.encrypt(
                    ticketHeader.ticketHolder + ticketHeader.eventId + ticketFooter[i].type,
                    'secret key'
                ).toString();
                ticketObjects.push({
                    ticketNumber,
                    eventId: ticketHeader.eventId,
                    eventTitle: ticketHeader.eventTitle,
                    purchaseDate: Date.now(),
                    startDate: ticketHeader.startDate,
                    ticketHolder: ticketHeader.ticketHolder,
                    ticketType: ticketFooter[i].type,
                    ticketPrice: ticketFooter[i].price
                });
            }
        }
        return ticketObjects;
    }

    useEffect(() => {
        const ticketObjects = createTickets();
        setTickets(ticketObjects)
    }, [])

    // const stringTickets = JSON.stringify(tickets)

    // The event name and date
    // The ticket holder's name
    // The ticket type(e.g.general admission, VIP, etc.)
    // The ticket price
    // The ticket purchase date
    // The ticket number or barcode
    // The seat or section number(if applicable)
    // The event location and venue

    const startDate = new Date(ticketHeader.startDate)
    const dateFormat = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedDate = dateFormat.format(startDate); // "Month d, yyyy"

    const timeFormat = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    const formattedTime = timeFormat.format(startDate);

    const ticketCard = ({ item }) => (
        <Animatable.View style={styles.ticketCon} delay={600} animation='fadeInRight' easing="ease-out-circ">
            <View style={styles.details}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.eventTitle}</Text>
                <View>
                    <Text>Date:</Text>
                    <Text>{formattedDate}</Text>
                </View>
                <View>
                    <Text>Time:</Text>
                    <Text>{formattedTime}</Text>
                </View>
                <View>
                    <Text>{item.ticketHolder}</Text>
                </View>
                <View>
                    <Text>{item.ticketType}</Text>
                </View>

                <Divider />
            </View>
            <QRCode ticketInfo={JSON.stringify(item)} size={200} setLoading={setLoading} />
        </Animatable.View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground />
            <BackButton />
            {loading && <ActivityIndicator />}
            <View style={styles.listCon}>
                <FlatList
                    data={tickets}
                    renderItem={ticketCard}
                    keyExtractor={item => item.ticketNumber}
                    horizontal
                    initialNumToRender={10}
                    removeClippedSubviews
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={400}
                    decelerationRate="fast"
                    snapToAlignment='start'
                />
            </View>

            {/* <FlatList
                data={tickets}
                renderItem={({ item }) => (
                    <QRCodeGenerator
                        ticketInfo={item}
                        size={200}
                    />
                )}
                keyExtractor={item => item.ticketNumber}
                horizontal
            /> */}
            {/* <View style={styles.container}>
                {ticketHeader &&
                    <View style={styles.details}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{ticketHeader.eventTitle}</Text>
                        <Text>Start Date</Text>
                        <Text>{formattedDate}</Text>
                        <Text>Start Time</Text>
                        <Text>{formattedTime}</Text>
                        <Text>{ticketHeader.ticketHolder}</Text>
                        <Text>Ticket Type</Text>
                        <Text>Seat if or NA</Text>
                        <Divider />
                    </View>
                }

                    <View style={styles.code}>
                                <QRCodeGenerator
                                    ticketInfo={ticket}
                                    size={200}
                                />
                    </View>

            </View> */}
        </SafeAreaView>
    )
}

export default TicketScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    poster: {
        flex: 1,
        backgroundColor: '#333',
        height: 200
    },
    details: {
        width: '100%',
        height: '60%',
        // padding: 15,
        // borderWidth: 1,
        justifyContent: 'space-evenly',
        // paddingHorizontal: 20
    },
    ticketCon: {
        height: 550,
        width: 300,
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderWidth: 1,
        marginTop: 60,
        marginHorizontal: 50,
        backgroundColor: '#fff',
        padding: 20
    },
    // code: {
    //     alignSelf: 'center',
    //     marginVertical: 20,
    //     backgroundColor: '#fff',
    //     padding: 10,
    //     borderRadius: 10
    // },
})