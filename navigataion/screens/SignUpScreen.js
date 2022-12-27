import React, { useState } from 'react'
import { SafeAreaView, Alert, StyleSheet, View, Text, TextInput } from 'react-native'
import Checkbox from 'expo-checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { supabase } from '../../supabase/supabase'
import { useNavigation } from '@react-navigation/native'

export default function SignUpScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [loading, setLoading] = useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const { navigate } = useNavigation()

    async function signUpWithEmail() {
        if (password !== password2) {
            Alert.alert('Passwords do not match')
            return
        }
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        else navigate('Login')

        setLoading(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={[styles.verticallySpaced, styles.mt20]}>
                <TextInput style={styles.input}
                    label="Name"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    placeholder="Full name"
                    autoCapitalize={'none'}
                />
            </View> */}
            <Text style={styles.header}>SignUp</Text>
            <View style={styles.verticallySpaced}>
                <TextInput style={styles.input}
                    label="Email"
                    // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput style={styles.input}
                    label="Password"
                    // leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={!toggleCheckBox}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput style={styles.input}
                    label="Password2"
                    // leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword2(text)}
                    value={password2}
                    secureTextEntry={!toggleCheckBox}
                    placeholder="Confirm Password"
                    autoCapitalize={'none'}
                />
            </View>

            <View style={styles.flexRow}>
                <Checkbox style={styles.checkbox}
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={styles.label}>Show password</Text>
            </View>

            <View style={styles.verticallySpaced}>
                <TouchableOpacity style={styles.button} disabled={loading} onPress={() => signUpWithEmail()} >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.footer, styles.verticallySpaced, styles.mt20]}>
                <Text style={styles.question}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigate('Login')}>
                    <Text style={styles.link}> Login</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 250,
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
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        height: 16,
        width: 16,
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
    }
})
