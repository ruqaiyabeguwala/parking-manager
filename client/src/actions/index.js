
 import {SET_ALERT,REMOVE_ALERT} from "./types"
 import {v1 as uuid} from "uuid"
 export * from "./userAction"
 export * from "./vehicleAction"
 
 
//set alert for transactions
export const setAlert=(msg,type)=>dispatch=>{
    const id = uuid();
    dispatch({
        type:SET_ALERT,
        payload:{type,msg,id}
    })

    setTimeout(
        ()=>dispatch({
           type:REMOVE_ALERT,
           payload:id
        }),5000
        
        )
}

