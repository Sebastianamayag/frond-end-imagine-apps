import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
export const ModalStatus = ({visible, closeModal,onChange,value}) => {
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
                <Picker
                    style={{color: 'black'}}
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                    dropdownIconColor= 'black'
                >
                    <Picker.Item label="Pendiente" value="Pendiente" />
                    <Picker.Item label="En camino" value="En camino" />
                    <Picker.Item label="Entregado" value="Entregado" />
                </Picker>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right:0,
        top: hp(6),
        width: wp(50),
        backgroundColor: 'gray',
        borderRadius: wp(3)
    }
});