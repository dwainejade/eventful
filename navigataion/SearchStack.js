import React from 'react'
import SearchScreen from './screens/SearchScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import BookingScreen from './screens/BookingScreen';
import PosterScreen from './screens/PosterScreen';

const Stack = createStackNavigator();

export default function SearchStack({ navigation, route }) {
    React.useLayoutEffect(() => {
        const tabHiddenRoutes = ["EventDetails"];
        const routeName = getFocusedRouteNameFromRoute(route);

        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator id="searchStack"
            initialRouteName="SearchScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    );
}