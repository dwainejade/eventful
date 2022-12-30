import 'react-native-url-polyfill/auto'
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { supabase } from '../supabase/supabase'

//screens
import HomeStack from './HomeStack';
import MyTicketsScreen from './screens/MyTicketsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginStack from './LoginStack'
import { useStoreActions, useStoreState } from 'easy-peasy';
import SearchScreen from './screens/SearchScreen';

// screen names
const homeName = 'Home';
const profileName = 'Profile';
const ticketsName = 'Tickets';
const searchName = 'Search';

const Tab = createBottomTabNavigator();


export default function MainContainer() {
    const session = useStoreState((state) => state.session)
    const setSession = useStoreActions((actions) => actions.setSession);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <NavigationContainer>
            {/* if authenticated show home else show login */}
            {
                session ?
                    <Tab.Navigator
                        initialRouteName={homeName}
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                let rn = route.name;

                                if (rn === homeName) {
                                    iconName = focused ? 'home' : 'home-outline';
                                    return <Ionicons name={iconName} size={size} color={color} />;
                                } else if (rn === profileName) {
                                    iconName = focused ? 'person' : 'person-outline';
                                    return <Ionicons name={iconName} size={size} color={color} />;
                                } else if (rn === ticketsName) {
                                    iconName = focused ? 'ticket' : 'ticket-outline';
                                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                                }
                                else if (rn === searchName) {
                                    iconName = focused ? 'search' : 'search-outline';
                                    return <Ionicons name={iconName} size={size} color={color} />;
                                }

                            },
                            headerShown: false,
                            tabBarActiveTintColor: '#333',
                            tabBarInactiveTintColor: 'grey',
                            tabBarLabelStyle: { paddingBottom: 5, fontSize: 10 },
                            tabBarStyle: [{ display: 'flex', padding: 10, height: 85 }, null]
                        })}
                    >
                        <Tab.Screen name={homeName} component={HomeStack} />
                        <Tab.Screen name={searchName} component={SearchScreen} />
                        <Tab.Screen name={ticketsName} component={MyTicketsScreen} />
                        <Tab.Screen name={profileName} component={ProfileScreen} />
                    </Tab.Navigator>

                    : <LoginStack />
            }

        </NavigationContainer>
    )
}