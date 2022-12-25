import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({ label, text, secureTextEntry, placeholder, autoCapitalize = 'none' }) => {

    return (
        <>
            <TextInput style={styles.input}
                label={label}
                text={text}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCapitalize={autoCapitalize}
            />
        </>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E9EBED',
        width: '80%',
        height: 40,
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: 18
    },
})