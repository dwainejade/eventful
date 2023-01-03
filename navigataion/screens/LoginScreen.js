import React, { useState, useRef } from 'react'
import { Alert, StyleSheet, View, TouchableOpacity, Image, Text, TextInput, SafeAreaView, ActivityIndicator } from 'react-native'
import Checkbox from 'expo-checkbox';
import { supabase } from '../../supabase/supabase'
import logo from '../../assets/splash.png'
import { useNavigation } from '@react-navigation/native'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const navigation = useNavigation()
    const passRef = useRef()

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }


    return (
        <SafeAreaView style={styles.container}>

            <Image source={logo} resizeMethod='contain' style={styles.logo} />
            {loading &&
                <ActivityIndicator style={styles.spinner} size='large' />
            }

            <Text style={styles.header}>Login</Text>

            <View style={[styles.verticallySpaced]}>
                <TextInput style={styles.input}
                    label="Email"
                    returnKeyType="next"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="Email"
                    autoCapitalize={'none'}
                    onSubmitEditing={() => passRef.current.focus()}
                    blurOnSubmit={false}
                />
            </View>

            <View style={styles.verticallySpaced}>
                <TextInput style={styles.input}
                    label="Password"
                    ref={passRef}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={!toggleCheckBox}
                    placeholder="Password"
                    autoCapitalize={'none'}
                    onSubmitEditing={signInWithEmail}
                />
            </View>

            <View style={styles.flexRow}>
                <Checkbox
                    style={styles.checkbox}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={styles.label}>Show password</Text>
            </View>

            <View style={[styles.verticallySpaced, styles.mt20]}>
                <TouchableOpacity style={styles.button} disabled={loading} onPress={() => signInWithEmail()} >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.footer, styles.verticallySpaced, styles.mt20]}>
                <Text style={styles.question}>Don't already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.link}> Sign Up</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: 250,
        alignSelf: 'center'
    },
    logo: {
        width: 250,
        height: 150,
        marginTop: 20,
        alignSelf: 'center'
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        marginBottom: 8
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    mt20: {
        marginTop: 20,
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#9AA3AC',
        width: '100%',
        height: 40,
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: 18
    },
    checkbox: {
        height: 20,
        width: 20,
        margin: 5,
    },
    label: {
        color: '#444'
    },
    button: {
        backgroundColor: '#000',
        width: '100%',
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    buttonText: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    question: {
        color: '#4C5457'
    },
    link: {
        color: 'dodgerblue',
        fontWeight: 'bold'
    },
    spinner: {
        position: 'absolute',
        top: '20%',
        alignSelf: 'center'
    }
})
