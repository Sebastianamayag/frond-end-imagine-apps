import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ShippingsView = ({ shipment }) => {
    const [region, setRegion] = useState({
        latitude: 4.624335,
        longitude: -74.063644,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>ID de envío:</Text>
                <Text style={styles.subTitleText}>{shipment.id}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.row}>
                    <Icon name="user" size={RFPercentage(2.5)} style={styles.icon} />
                    <Text style={styles.infoText}>{shipment.usuario}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="truck" size={RFPercentage(2.5)} style={styles.icon} />
                    <Text style={styles.infoText}>{shipment.proveedor}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="calendar" size={RFPercentage(2.5)} style={styles.icon} />
                    <Text style={styles.infoText}>{shipment.fechaEntrega}</Text>
                </View>
            </View>
            <MapView
                style={styles.map}
                region={region}
                provider={PROVIDER_GOOGLE}
            >
                <Marker
                    coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                    title={shipment.origin}
                />
                <Marker
                    coordinate={{ latitude: region.latitude + 0.01, longitude: region.longitude + 0.01 }}
                    title={shipment.destination}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: wp(4),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: RFPercentage(2.5),
        marginBottom: hp(1),
        color: '#eba061'
    },
    subTitleText: {
        fontSize: RFPercentage(2),
    },
    body: {
        padding: wp(4),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(3),
    },
    icon: {
        marginRight: 10,
    },
    infoText: {
        fontSize: RFPercentage(2),
    },
    map: {
        flex: 1,
    },
});
