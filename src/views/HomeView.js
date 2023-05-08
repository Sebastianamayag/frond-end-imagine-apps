import React, { useEffect ,useState} from 'react'
import { ScrollView, Text, View, BackHandler, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { style } from '../styles/globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { STATUS } from '../store/types/types';
import { Button } from '../components/Button';
import { Item } from '../components/Item';
import { getAllShippings } from '../store/actions/shippingsActions';
import { ModalStatus } from '../components/ModalStatus';
export const HomeView = ({ navigation, route }) => {
  const shippings = useSelector(state => state.Shipp.getShippings.shippings);
  const shippingStatus = useSelector(state => state.Shipp.getShippings.status);
  const shippingCreateStatus = useSelector(state => state.Shipp.createShipp.status);
  const shippingUpdateStatus = useSelector(state => state.Shipp.updateShipp.status);
  const [shipps, setshipps] = useState([]);
  const [statusShipping, setStatusShipping] = useState('pendiente');
  const [modalStatus, setModalStatus] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if(shippingStatus === STATUS.NONE || shippingCreateStatus === STATUS.SUCCESS || shippingUpdateStatus === STATUS.SUCCESS){
      dispatch(getAllShippings())
    }
  }, [shippingCreateStatus,shippingUpdateStatus]);
  useEffect(() => {
    if (route.name === 'Home') {
      BackHandler.addEventListener("hardwareBackPress", () => true)
    }
  }, [route.name])

  useEffect(() => {
    setshipps(shippings);
  }, [shippings])


  useEffect(() => {
    handleFilter(statusShipping)
  }, [statusShipping])

  if (shippingStatus === STATUS.LOADING) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <ActivityIndicator size={hp(10)} color={'#e61f6d'} />
      </View>
    )
  }

  const handleFilter = (status) => {
    const newShipps=shippings.filter((data)=>data.statusShipping === status);
    setshipps(newShipps)
  }

  return (
    <View
      style={{ marginHorizontal: wp(5), flex: 1 }}
    >
      <Text maxFontSizeMultiplier={1} style={style.title} >Envios</Text>
      <TouchableOpacity onPress={()=>setModalStatus(true)} style={{ position: 'absolute', right: 0, top: hp(2.5) }} >
        <Icon name="filter" size={30} color="#000" />
      </TouchableOpacity>
      <ModalStatus visible={modalStatus} closeModal={()=>setModalStatus(false)} value={statusShipping} onChange={setStatusShipping} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: hp(10) }}
      >
        {
          shipps.map(data => (
            <Item navigation={navigation} key={data.id} data={data} />
          ))
        }
      </ScrollView>
      <View style={{ position: 'absolute', bottom: hp(2), alignSelf: 'center' }}>
        <Button text={'Crear envios'} color={'#735d56'} width={70} padding={3.5} textColor={'white'} action={() => { navigation.navigate('Form') }} />
      </View>
    </View>
  )
}
