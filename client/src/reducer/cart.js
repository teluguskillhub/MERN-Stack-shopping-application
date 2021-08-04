const initialState=[]

const cart = (state=initialState,action) =>{
    const {type,payload}=action
    switch(type){
        case "CART_ADDING_SUCCESS":
        case "CART_GETTING_SUCCESS":
            return [...payload];
        case "CART_ADDING_FAIL":
        case "CART_GETTING_FAIL":
        case "CART_REMOVE_FAIL":
            return [];
        case "CART_REMOVE_SUCCESS":
            return state.filter(cart => cart._id !== payload);
        default:
            return state;
        
    }
}

export default cart;