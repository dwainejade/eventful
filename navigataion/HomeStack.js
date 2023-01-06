import React from 'react'
import HomeScreen from './screens/HomeScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import BookingScreen from './screens/BookingScreen';
import PosterScreen from './screens/PosterScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import TicketScreen from './screens/TicketScreen';

const Stack = createStackNavigator();

export default function HomeStack({ navigation, route }) {

    React.useLayoutEffect(() => {
        const tabHiddenRoutes = ["EventDetails", "Booking", "Poster", 'Ticket'];
        const routeName = getFocusedRouteNameFromRoute(route);

        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
            <Stack.Screen name="Poster" component={PosterScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Ticket" component={TicketScreen} />
        </Stack.Navigator>
    );
}