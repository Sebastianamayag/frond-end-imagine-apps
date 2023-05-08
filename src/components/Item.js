import React, {useState} from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from  'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
// import { useDispatch } from 'react-redux';
// import { addProductCart, deleteProductCart } from '../store/actions/productsActions';

export const Item = ({ navigation, data }) => {

    const editarEnvio = () => {
        navigation.navigate('Form',{data})
    };
    return (
        <TouchableOpacity
            onPress={()=>navigation.navigate('Shipping', {shipment:data})}
            style={{marginBottom: hp(1.2)}}
        >
            <View style={style.container}>
                <Text style={style.titleTextCard}>Id del envio: {'\n'}<Text style={style.subTitleTextCard}>{data.id}</Text></Text>
                <Text style={style.titleTextCard}>Estado : {'\n'}<Text style={style.subTitleTextCard}>{data.statusShipping}</Text></Text>
                <Text style={style.titleTextCard}>Fecha de entrega:{'\n'} <Text style={style.subTitleTextCard}>{data.date}</Text></Text>
                <TouchableOpacity onPress={editarEnvio}>
                    <Icon name="edit" size={hp(3)} color="#fff" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
};

const style = StyleSheet.create({
    container: {
        width: wp(90),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eba061',
        borderRadius: wp(2),
        padding: wp(3),
        justifyContent: 'space-between'
    },
    titleTextCard: {
        fontWeight: 'bold',
        fontSize: RFPercentage(1.4),
        textAlign: 'justify',
    },
    subTitleTextCard: {
        fontSize: RFPercentage(2.0),
        textAlign: 'justify',
    },
    
})