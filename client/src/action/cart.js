import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import setAlert from './alert';


//add to cart
export const addToCart = formData => async dispatch =>{
    const {user,title,imagename,price} = formData;
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({user,title,imagename,price});
    try{
        const res = await axios.post('/api/cart',body,config);
        dispatch({
            type : "CART_ADDING_SUCCESS",
            payload:res.data
        });
        dispatch(setAlert('Item Added to Cart', 'success'));
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:"CART_ADDING_FAIL"
        })
    }
    
}


//get cart
export const getCart = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get('/api/cart');
        dispatch({
            type : "CART_GETTING_SUCCESS",
            payload:res.data
        });
        console.log("getcart",res.data)
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type:"CART_GETTING_FAIL"
        })
    }
    
}



// remove from cart
export const deleteCart = id => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        await axios.delete(`/api/cart/${id}`);
        dispatch({
            type:"CART_REMOVE_SUCCESS",
            payload:id
        })
        dispatch(setAlert('Item Removed', 'success'));
    }
    catch(err){
        dispatch({
            type: "CART_REMOVE_FAIL",
          });
    }
}
