import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import QRCode from '../../components/QRCodeGenerator'

const TicketScreen = ({ navigation, route }) => {
    const { ticketInfo } = route.params
    const ticketDetails = JSON.stringify(ticketInfo)
    console.log('Ticket Screen - ticketInfo: ', ticketDetails)

    return (
        <SafeAreaView>
            <Text>TicketScreen</Text>
            <QRCode
                ticketInfo={ticketDetails}
            />
        </SafeAreaView>
    )
}

export default TicketScreen

const styles = StyleSheet.create({})