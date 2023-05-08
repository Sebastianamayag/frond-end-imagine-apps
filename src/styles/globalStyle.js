import { StyleSheet } from "react-native";
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
export const style = StyleSheet.create({
    title: {
      fontWeight: 'bold',
      fontSize: RFPercentage(3.5),
      marginVertical: hp(2),
      color: '#eba061',
      textAlign:'center',
    },
    titleNotFound: {
      fontWeight: '600',
      fontSize: RFPercentage(3),
      marginVertical: hp(2),
      color: 'black',
      textAlign:'justify'
    },

  })