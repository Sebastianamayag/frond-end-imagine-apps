import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '../components/Button';
import { style  } from '../styles/globalStyle';
import { DateTime } from '../components/DateTime';
import { ModalAdress } from '../components/ModalAddress';
import { useDispatch, useSelector } from 'react-redux';
import { createShippings, updateShippings } from '../store/actions/shippingsActions';
import { STATUS } from '../store/types/types';

export const FormShippingsView = ({data, navigation}) => {
    const shippingCreateStatus = useSelector(state => state.Shipp.createShipp.status);
    const shippingUpdateStatus = useSelector(state => state.Shipp.updateShipp.status);
    const [statusShipping, setStatusShipping] = useState(data?data.statusShipping:'pendiente');
    const [date, setDate] = useState(data?new Date(data):new Date());
    const [nombreUsuario, setNombreUsuario] = useState(data?data.nombreUsuario:'');
    const [nombreProveedor, setNombreProveedor] = useState(data?data.nombreProveedor:'');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAddressOpen, setModaAddresslOpen] = useState(false);
    const [origin, setOrigin] = useState(data?data.origin:'');
    const [destination, setDestination] = useState(data?data.destination:'');
    const anio = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${anio}-${mes}-${dia}`;
    const dispatch = useDispatch();
    const handleSumbit=()=>{
        const datas ={
            statusShipping,
            date: fechaFormateada,
            nombreUsuario,
            nombreProveedor,
            origin,
            destination
        }
        if(data){
            dispatch(createShippings(datas));
        }else{
            dispatch(updateShippings(datas));
        }
    }

    useEffect(() => {
        if(shippingCreateStatus === STATUS.SUCCESS || shippingUpdateStatus === STATUS.SUCCESS){
          navigation.navigate('Home')
        }
      }, [shippingCreateStatus,shippingUpdateStatus]);

    return (
        <View style={{backgroundColor: 'white', flex: 1, paddingHorizontal: wp(5)}}>
            <Text maxFontSizeMultiplier={1} style={style.title} >{data?'Actualizar':'Crear'} Envios</Text>
            <Text style={styles.colorText}>Estado:</Text>
            <Picker
                style={{color: 'black'}}
                selectedValue={statusShipping}
                onValueChange={(itemValue) => setStatusShipping(itemValue)}
                dropdownIconColor= 'black'
            >
                <Picker.Item label="Pendiente" value="Pendiente" />
                <Picker.Item label="En camino" value="En camino" />
                <Picker.Item label="Entregado" value="Entregado" />
            </Picker>

            <Text style={styles.colorText}>Fecha de entrega:</Text>
            <TouchableOpacity
                style={{padding:hp(2.2),...styles.textInput}}
                onPress={() => setModalOpen(true)}
            >
                <Text style={{color: 'black'}} >{fechaFormateada}</Text>
            </TouchableOpacity>

            <DateTime date={date} setModalOpen={setModalOpen} modalOpen={modalOpen} setDate={setDate} />

            <Text style={styles.colorText}>Nombre de usuario:</Text>
            <TextInput
                style={styles.textInput}
                value={nombreUsuario}
                onChangeText={(text) => setNombreUsuario(text)}
            />

            <Text style={styles.colorText}>Nombre del proveedor:</Text>
            <TextInput
                style={styles.textInput}
                value={nombreProveedor}
                onChangeText={(text) => setNombreProveedor(text)}
            />

            <Text style={styles.colorText}>Direccion de Envio:</Text>
            <TouchableOpacity
                style={{padding:hp(2.2),...styles.textInput}}
                onPress={() => setModaAddresslOpen(true)}
            >
                <Text style={{color: 'black'}} >ORG: {origin} - DEST: {destination}</Text>
            </TouchableOpacity>
            <ModalAdress 
                visible={modalAddressOpen} 
                closeModal={() => setModaAddresslOpen(false)} 
                origin={origin} 
                destination={destination}
                setDestination={setDestination}
                setOrigin={setOrigin} 
            />
            <View style={{position: 'absolute',bottom: hp(4), alignSelf: 'center'}}>
                <Button text={data?'Actualizar envios':'Guardar envios'} color={'#735d56'} width={90} padding={3.5} textColor={'white'} action={handleSumbit} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    colorText: {
        color: '#eba061',
        fontWeight: 'bold',
        marginBottom: hp(0.5)
    },
    textInput: {
        width: wp(90),
        alignSelf: 'center',
        borderWidth: wp(0.3),
        borderRadius: wp(2),
        color: 'black',
        paddingHorizontal: wp(2)
    },
});