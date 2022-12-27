import React, { useState } from 'react'
import { Alert, StyleSheet, View, TouchableOpacity, Image, Text, TextInput, SafeAreaView } from 'react-native'
import { supabase } from '../../supabase/supabase'
import logo from '../../assets/splash.png'
import { useNavigation } from '@react-navigation/native'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

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

            <View style={[styles.verticallySpaced]}>
                <TextInput style={styles.input}
                    label="Email"
                    // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="Email"
                    autoCapitalize={'none'}
                />
            </View>

            <View style={styles.verticallySpaced}>
                <TextInput style={styles.input}
                    label="Password"
                    // leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
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
        marginTop: 10,
        paddingHorizontal: 40,
    },
    logo: {
        width: 250,
        height: 150,
        marginTop: 20,
        alignSelf: 'center'
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#9AA3AC',
        width: '80%',
        height: 40,
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: 18
    },
    button: {
        backgroundColor: '#000',
        width: '80%',
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
    }
})
