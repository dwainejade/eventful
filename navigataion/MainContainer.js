import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import HomeStack from './HomeStack';
import MyTicketsScreen from './screens/MyTicketsScreen';
import ProfileScreen from './screens/ProfileScreen';

// screen names
const homeName = 'HomeStack';
const profileName = 'Profile';
const ticketsName = 'Tickets';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === profileName) {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (rn === ticketsName) {
                            iconName = focused ? 'film' : 'film-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    headerShown: false,
                    tabBarActiveTintColor: '#333',
                    tabBarInactiveTintColor: 'grey',
                    tabBarLabelStyle: { paddingBottom: 5, fontSize: 10 },
                    tabBarStyle: [{ display: 'flex', padding: 10, height: 85 }, null]
                })}
            >

                <Tab.Screen name={ticketsName} component={MyTicketsScreen} />
                <Tab.Screen name={homeName} component={HomeStack} />
                <Tab.Screen name={profileName} component={ProfileScreen} />

            </Tab.Navigator>

        </NavigationContainer>
    )
}