import { View } from 'react-native'
import React from 'react'

export default function Divider() {
    return (
        <View style={{
            borderWidth: 1,
            borderBottomWidth: 0,
            marginVertical: 20,
            borderColor: '#999'
        }} />
    )
}