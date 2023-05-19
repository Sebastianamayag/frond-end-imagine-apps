import axios from 'axios'
import { baseURL } from '../../config/globalConfig';
import { generateDispatch } from '../../functions/otherFunctions';
import { CREATE_SHIPPING_ATTEMPT, CREATE_SHIPPING_FAILURE, CREATE_SHIPPING_SUCCESS,GET_SHIPPINGS_ATTEMPT, GET_SHIPPINGS_SUCCEES, UPDATE_SHIPPING_ATTEMPT, UPDATE_SHIPPING_FAILURE, UPDATE_SHIPPING_SUCCESS } from '../types/types';

export const getAllShippings =()=>{
    return async(dispatch) => {
        dispatch(generateDispatch(GET_SHIPPINGS_ATTEMPT));
        const data=await axios.get(`${baseURL}shippings`);

        if(data.data.shippings){
            dispatch(generateDispatch(GET_SHIPPINGS_SUCCEES,data.data.shippings));
        }
    }
};

export const createShippings=(datas,navigation)=>{
    return async(dispatch) => {
        dispatch(generateDispatch(CREATE_SHIPPING_ATTEMPT));
        const data=await axios.post(`${baseURL}shippings`, {...datas});
        const response=data.data;
        if(response.mensaje){
            dispatch(generateDispatch(CREATE_SHIPPING_SUCCESS,{messaje:response.mensaje }));
            setTimeout(() => {
                navigation.navigate('Home');
            }, 2000);
        }else{
            dispatch(generateDispatch(CREATE_SHIPPING_FAILURE,{messaje:response.mensaje }));
        }
    }
}

export const updateShippings=(datas,navigation)=>{
    return async(dispatch) => {
        dispatch(generateDispatch(UPDATE_SHIPPING_ATTEMPT));
        const data=await axios.put(`${baseURL}shippings/${datas.id}`, {...datas});
        const response=data.data;
        if(response.mensaje){
            dispatch(generateDispatch(UPDATE_SHIPPING_SUCCESS,{messaje:response.mensaje }));
            setTimeout(() => {
                navigation.navigate('Home');
            }, 2000);
        }else{
            dispatch(generateDispatch(UPDATE_SHIPPING_FAILURE,{messaje:response.mensaje }));
        }
    }
}