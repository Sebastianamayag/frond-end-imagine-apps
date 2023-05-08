import { ADD_PRODUCT_CART, CREATE_SHIPPING_SUCCESS, DELETE_PRODUCT_CART, GET_SHIPP_SUCCEES, GET_SHIPPINGS_ATTEMPT, GET_SHIPPINGS_SUCCEES, STATUS, GET_SHIPP_NONE, GET_SHIPP_ATTEMPT as CREATE_SHIPP_ATTEMPT, CREATE_SHIPPING_ATTEMPT, CREATE_SHIPPING_FAILURE, UPDATE_SHIPPING_ATTEMPT, UPDATE_SHIPPING_SUCCESS, UPDATE_SHIPPING_FAILURE } from "../types/types";

const initialState = {
    getShippings: {
        status: STATUS.NONE,
        errors: {},
        shippings: [],
    },
    createShipp: {
        status: STATUS.NONE,
        message: '',
    },
    updateShipp: {
        status: STATUS.NONE,
        message: '',
    },
}


export const shippingsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_SHIPPINGS_ATTEMPT:
            newState.getShippings.status = STATUS.LOADING;
            return newState;
        case GET_SHIPPINGS_SUCCEES:
            newState.getShippings.shippings = action.payload;
            newState.getShippings.status = STATUS.SUCCESS;
            newState.getShippings.errors = {};
            return newState;
        case CREATE_SHIPPING_ATTEMPT:
            newState.createShipp.status = STATUS.LOADING;
            newState.createShipp.message = '';
            return newState;
        case CREATE_SHIPPING_SUCCESS:
            newState.createShipp.status = STATUS.SUCCESS;
            newState.createShipp.message = action.payload.messaje;
            return newState;
        case CREATE_SHIPPING_FAILURE:
            newState.createShipp.status = STATUS.NONE;
            newState.createShipp.message = action.payload.messaje;
            return newState;
        case UPDATE_SHIPPING_ATTEMPT:
            newState.updateShipp.status = STATUS.LOADING;
            newState.updateShipp.message = '';
            return newState;
        case UPDATE_SHIPPING_SUCCESS:
            newState.updateShipp.status = STATUS.SUCCESS;
            newState.updateShipp.message = action.payload.messaje;
            return newState;
        case UPDATE_SHIPPING_FAILURE:
            newState.updateShipp.status = STATUS.NONE;
            newState.updateShipp.message = action.payload.messaje;
            return newState;
        default:
            return newState
    }
}