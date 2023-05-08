import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import { Button } from './Button';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
export const ModalAdress = ({ origin, destination, setOrigin, setDestination, visible, closeModal }) => {

    const [region, setRegion] = useState({
        latitude: 4.624335,
        longitude: -74.063644,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const handleOriginChange = (value) => {
        setOrigin(value);
    };

    const handleDestinationChange = (value) => {
        setDestination(value);
    };

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setRegion({
            ...region,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
    };

    return (
        <Modal
            backdropOpacity={0.7}
            backdropColor={'rgba(12, 23, 74, 1)'}
            propagateSwipe
            isVisible={visible}
            animationInTiming={0.2}
            animationOutTiming={0.2}
            onBackButtonPress={closeModal}
            onBackdropPress={closeModal}
        >
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0} onPress={closeModal} >
                    <View style={styles.containerClose}>
                        <IconAwesome
                            size={wp(5)}
                            name={'close'}
                            color={'#e61f6e'}
                            style={{ alignSelf: 'center' }}
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <Text style={styles.colorText}>Direccion de Origen:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Origen"
                        value={origin}
                        onChangeText={handleOriginChange}
                    />
                    <Text style={styles.colorText}>Direccion de Destino:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Destino"
                        value={destination}
                        onChangeText={handleDestinationChange}
                    />
                </View>

                <MapView style={styles.map} region={region} onPress={handleMapPress} provider={PROVIDER_GOOGLE}>
                    {origin && (
                        <Marker
                            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                            title="Origin"
                            description={origin}
                        />
                    )}
                    {destination && (
                        <Marker
                            coordinate={{ latitude: region.latitude + 0.01, longitude: region.longitude + 0.01 }}
                            title="Destination"
                            description={destination}
                        />
                    )}
                </MapView>
                <View style={{ position: 'absolute', bottom: hp(2), alignSelf: 'center' }}>
                    <Button text={'Guardar direcciones'} color={'#735d56'} width={80} padding={3.5} textColor={'white'} action={closeModal} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: widthPercentageToDP(3)
    },
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(2),
    },
    containerClose: {
        position: 'absolute',
        top: -hp(2),
        right: -wp(3),
        borderRadius: wp(3.5),
        zIndex: 1,
        padding: wp(1),
        backgroundColor: 'white',
        width: wp(7),
        height: wp(7)
    },
    colorText: {
        color: '#eba061',
        fontWeight: 'bold',
        marginBottom: hp(0.5),
        alignSelf: 'flex-start',
        marginLeft: - heightPercentageToDP(2)
    },
    inputIcon: {
        marginRight: 10,
    },
    textInput: {
        width: widthPercentageToDP(80),
        alignSelf: 'center',
        borderWidth: widthPercentageToDP(0.3),
        borderRadius: widthPercentageToDP(2),
        marginBottom: heightPercentageToDP(2),
        color: 'black',
        paddingHorizontal: wp(2)
    },
    map: {
        flex: 1
    },
});