import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthView } from '../views/AuthView';
import { HomeView } from '../views/HomeView';
import { FormShippingsView } from '../views/FormShippingsView';
import { InitView } from '../views/InitView';
import { ShippingsView } from '../views/ShippingsView';

const Stack = createStackNavigator();


export const Navigation = () => {
    return (
        <NavigationContainer
        >
            <Stack.Navigator
                screenOptions={{ headerShown: false, gestureEnabled: false }}
                initialRouteName="InitView"
                
            >
                <Stack.Screen name="InitView" component={InitView} />
                <Stack.Screen name="Home" component={HomeView} />
                <Stack.Screen name="Auth" component={AuthView} />
                <Stack.Screen name="Form" component={FormShippingsView} />
                <Stack.Screen name="Shipping" component={ShippingsView} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

