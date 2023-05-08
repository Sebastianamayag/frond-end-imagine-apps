import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { style } from '../styles/globalStyle';
import { Button } from '../components/Button';
import { createrUser, singInUser } from '../functions/firebaseFunctions';
import { createAccountFailure, createAccountSuccess, loginAccountFailure, loginAccountSuccess } from '../store/actions/authActions';
export const AuthView = ({ navigation }) => {
  const dispatch = useDispatch();
  const [register, setRegister] = useState(false);
  const auth = useSelector(state => state.Auth.auth);
  const message = useSelector(state => state.Auth.message);
  const [credentials, setCredentials] = useState({});

  useEffect(() => {
    if (auth) navigation.navigate('Home')
  }, [auth,message])

  const handleSubmit = () => {
    if(register){
      //crea el usuario
      createrUser(credentials.email, credentials.password,()=>dispatch(createAccountSuccess()),()=>dispatch(createAccountFailure('No se pudo crear el usuario')))
    }else{
      //login del usuario
      singInUser(credentials.email, credentials.password, ()=>dispatch(loginAccountSuccess()),()=>dispatch(loginAccountFailure('Credenciales incorrectas')))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Image style={styles.image} source={{ uri: 'https://media.licdn.com/dms/image/C4D0BAQFkzaRXO1sCvQ/company-logo_200_200/0/1625163862547?e=2147483647&v=beta&t=zYC3Y2SLRETu7d2QEAtEgNAg67y5Tn6n7BCtHNcabxg' }} />
      </View>
      <View style={styles.formContainer}>
        <Text style={[styles.title, { color: 'black' }]}>Iniciar sesión</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre de usuario"
          placeholderTextColor={'black'}
          value={credentials.email}
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Contraseña"
          secureTextEntry={true}
          placeholderTextColor={'black'}
          value={credentials.password}
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        />
        {
          message.length>0 && (
            <Text style={[style.errorText,{color:'red',marginLeft:wp(5),marginBottom:hp(4)}]}>{message}</Text>
          )
        }
        <Button text={!register?'Iniciar Sesion':'Registrarse'} color={'#eba061'} width={70} textColor={'white'} action={handleSubmit} />
      </View>
      {
        !register && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
            <TouchableOpacity onPress={() =>setRegister(true)}>
              <Text style={styles.footerLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerTop: {
    marginTop: hp(2),
  },
  image: {
    width: wp(40),
    alignSelf: 'center',
    height: wp(33)
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: RFPercentage(2.4),
    fontWeight: 'bold',
    marginBottom: hp(2),
  },
  textInput: {
    width: wp(70),
    alignSelf: 'center',
    borderWidth: wp(0.3),
    paddingHorizontal: wp(2),
    marginBottom: hp(1),
    color: 'black',
    borderRadius: wp(2)
  },
  footer: {
    flexDirection: 'row',
    marginTop: hp(5),
  },
  footerText: {
    marginRight: wp(3),
    color: 'black'
  },
  footerLink: {
    color: '#eba061',
  },
});

