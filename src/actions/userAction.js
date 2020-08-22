import {LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,AUTH_FAIL,AUTH_SUCCESS,
    LOGOUT,LOGOUT_ERROR} from "./types"
 import axios from "axios";
 import {setAlert} from "./index"

 export const loadUser=()=>async dispatch=>{
    try{
const res= await axios.get("/auth/api/get_user");
dispatch({
    type:AUTH_SUCCESS,
    payload:res.data
})

    }
    catch(err){
        console.error(err.response)
     //   const errors=err.response.data.errors;
        if(err.response.data){
            err.response.data.errors.forEach(err=>{
        //  dispatch(setAlert(err.msg,"danger"))
            })
        }
        dispatch({
            type:AUTH_FAIL,
            payload: {msg:err.response.statusText,type:err.response.status}
        })
       
    }
}
export const loginUser=(user)=>async dispatch=>{
    try{
    const res=await axios.post("/auth/login",user);
    if(res.status===401)
        dispatch(setAlert("email or password is invalid","danger"))
    dispatch({
        type:LOGIN_USER_SUCCESS,
        payload:res.data
    })
   dispatch( setAlert("login success","success"))
    }
    catch(err){
        console.error(err.response)
      /*  const errors=err.response.data.errors;
        if(errors){
            errors.forEach(err=>{
          dispatch(setAlert(err.msg,"danger"))
            })
        }
        dispatch({
            type:LOGIN_USER_FAIL,

           payload: {msg:err.response.statusText,type:err.response.status}
        })
        */
    }
}
export const logout=()=>async dispatch=>{
   try{
 await axios.get("/auth/logout");
    dispatch({
        type:LOGOUT
    })
   }

   catch(err){
       console.error(err);
       dispatch({
           type: LOGOUT_ERROR
       })
   }
    
}