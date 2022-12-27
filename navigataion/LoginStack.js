import React from 'react'
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function HomeStack({ navigation, route }) {

    return (
        <Stack.Navigator initialRouteName="LoginScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
}