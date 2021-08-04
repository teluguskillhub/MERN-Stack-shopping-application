import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import setAlert from './alert';
import {getCart} from './cart';
import {getOrder} from './order';

// user loading
export const loadUser = () =>async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get('/api/user/profile');
        dispatch({
            type:"USER_LOADED",
            payload:res.data
        });      
    }
    catch(err){
        dispatch({
            type:"AUTH_ERROR"
        })
    }
};

//user register
export const register = formData => async dispatch =>{
    const {name,email,password,address,pincode,state,city,phone} = formData;
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({name,email,password,address,pincode,state,city,phone});
    try{
        const res = await axios.post('/api/user',body,config);
        dispatch({
            type : "REGISTER_SUCCESS",
            payload:res.data
        });
        dispatch(loadUser());
        dispatch(getCart());
        dispatch(getOrder());
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:"REGISTER_FAIL"
        })
    }
    

}

//user login

export const login = formData => async dispatch =>{
    const {email,password} = formData;
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password});
    try{
        const res = await axios.post('/api/auth',body,config);
        dispatch({
            type : "LOGIN_SUCCESS",
            payload:res.data
        });
        dispatch(loadUser());
        dispatch(getCart());
        dispatch(getOrder());
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:"LOGIN_FAIL"
        })
    
    }
    
}

//user logout
export const logout = () => dispatch =>{
    dispatch({
        type:"LOGOUT"
    }) ;
    dispatch({
        type:"CART_ADDING_FAIL"
    })
    dispatch({
        type:"ORDER_ADDING_FAIL"
    })
}