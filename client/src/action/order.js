import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import setAlert from './alert';


//add to order
export const addToOrder = formData => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    const {user,title,imagename,price,address} = formData;
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({user,title,imagename,price,address});
    try{
        const res = await axios.post('/api/order',body,config);
        dispatch({
            type : "ORDER_ADDING_SUCCESS",
            payload:res.data
        });
        dispatch(setAlert('Order Placed Successfully !!', 'success'));
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:"ORDER_ADDING_FAIL"
        })
    }
    
}


//get order
export const getOrder = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get('/api/order');
        dispatch({
            type : "ORDER_GETTING_SUCCESS",
            payload:res.data
        });
        console.log("getorder",res.data)
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:"ORDER_GETTING_FAIL"
        })
    }
    
}



// remove from cart
export const deleteOrder = (id) => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    console.log('deleteOrder triggered')
    try{
        await axios.delete(`/api/order/${id}`);
        dispatch({
            type:"ORDER_REMOVE_SUCCESS",
            payload:id
        })
        dispatch(setAlert('Order Cancelled', 'success'));
    }
    catch(err){
        dispatch({
            type: "ORDER_REMOVE_FAIL",
          });
    }
}

export const deleteOrders = () =>{
    console.log("12345")
}