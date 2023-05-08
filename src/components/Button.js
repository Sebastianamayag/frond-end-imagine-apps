import React from 'react'
import { StyleSheet, TouchableOpacity, View ,Text} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const Button = ({ color, action ,text,textColor, width, padding = 2.5}) => {
    return (
        <TouchableOpacity onPress={()=>action()}>
            <View style={[style.button,{ backgroundColor: color, width:wp(width),padding:wp(padding) }]}>
                <Text style={[style.textButton,{color:textColor}]} >{text}</Text>
            </View>
        </TouchableOpacity>
    )
}


const style=StyleSheet.create({
    button:{
        alignSelf:'center',
        borderRadius:wp(2),
        marginTop:hp(1)
    },
    textButton:{
        fontSize: RFPercentage(2),
        textAlign: 'center'
    }
})