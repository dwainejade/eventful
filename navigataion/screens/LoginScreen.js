import React, { useState } from 'react'
import { Alert, StyleSheet, View, TouchableOpacity, Image, Text, SafeAreaView } from 'react-native'
import CustomInput from '../../components/CustomInput'
import { supabase } from '../../supabase/supabase'
import logo from '../../assets/splash.png'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

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
                <CustomInput
                    label="Email"
                    // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="Email"
                    autoCapitalize={'none'}
                />
            </View>

            <View style={styles.verticallySpaced}>
                <CustomInput
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
    }
})
