const initialState=[]

const order = (state=initialState,action) =>{
    const {type,payload}=action
    switch(type){
        case "ORDER_ADDING_SUCCESS":
        case "ORDER_GETTING_SUCCESS":
            return [...payload];
        case "ORDER_ADDING_FAIL":
        case "ORDER_GETTING_FAIL":
        case "ORDER_REMOVE_FAIL":
            return [];
        case "ORDER_REMOVE_SUCCESS":
            return state.filter(cart => cart._id !== payload);
        default:
            return state;
        
    }
}

export default order;