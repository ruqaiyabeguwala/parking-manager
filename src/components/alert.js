import React from 'react';
import {connect} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {Toast,ToastBody,ToastHeader} from "reactstrap"

const Alert=({alert})=>
alert!=null && 
alert.length>0 &&
alert.map(
    a=>
    (   
    <Toast key={a.id} className={` bg-${a.type}`} style={{zIndex:"10",position:"absolute",width:"300px",right:"0"}}>
        <ToastHeader >{a.type}</ToastHeader>
        <ToastBody style={{textAlign:"center",size:"20px"}}>{a.msg}</ToastBody>
    </Toast>
    ));               

function mapStateToProps(state){
    return{
        alert:state.alert
    }
}

export default connect(mapStateToProps)(Alert);