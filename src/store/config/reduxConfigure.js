import { combineReducers } from 'redux'
import { authReducer } from '../reducer/authReducer';
import { shippingsReducer } from '../reducer/shippingsReducer';
// import { themeReducer } from '../reducer/themeReducer';
const ReduxConfigure = combineReducers({
    Auth:authReducer,
    Shipp: shippingsReducer
});

export default ReduxConfigure;