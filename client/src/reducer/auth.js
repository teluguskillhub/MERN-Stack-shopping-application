const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

const auth = (state=initialState,action) =>{
    const {type,payload} = action
    switch(type){
        case "USER_LOADED":
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            localStorage.setItem('token',payload.token)
            return{ 
                ...state,
                ...payload,
                loading : false,
                isAuthenticated:true
            }
        case "LOGIN_FAIL":
        case "AUTH_ERROR":
        case "LOGOUT":
        case "REGISTER_FAIL":
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null
            }
        default:
            return state;
    }
}
export default auth;