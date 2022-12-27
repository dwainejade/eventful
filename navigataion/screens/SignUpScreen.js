import React, { useState } from 'react'
import { SafeAreaView, Alert, StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { supabase } from '../../supabase/supabase'
import CustomInput from '../../components/CustomInput'
import { useNavigation } from '@react-navigation/native'

export default function SignUpScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    async function signUpWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email: 'dwainegnd@gmail.com',
            password: 'testuser22',
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    return (
        <SafeAreaView>
            {/* <View style={[styles.verticallySpaced, styles.mt20]}>
                <CustomInput
                    label="Name"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    placeholder="Full name"
                    autoCapitalize={'none'}
                />
            </View> */}
            <View style={styles.verticallySpaced}>
                <CustomInput
                    label="Email"
                    // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
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
            <View style={styles.verticallySpaced}>
                <TouchableOpacity style={styles.button} disabled={loading} onPress={() => signUpWithEmail()} >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.verticallySpaced, styles.mt20]} onPress={() => navigation.navigate('Login')}>
                <Text>log in</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
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
