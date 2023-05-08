import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { auth } from '../functions/firebaseFunctions';

export const InitView = ({ navigation }) => {

    const checkCredentials = async () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate('Home')
            } else {
                navigation.navigate('Auth')
            }
        });
    }

    useEffect(() => {
        checkCredentials();
    }, []);


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator size={'large'} color={'#e61f6d'} />
        </View>
    )
}
