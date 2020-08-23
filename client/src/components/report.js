import React from 'react';
import * as actions from './../actions';
import { connect } from "react-redux";
import { Table, Button } from 'reactstrap';
import {Redirect} from "react-router"

const Report = ({getReport,report,setAlert,user,history}) => {
    React.useEffect(() => {
       getReport()
    }, [])

    if (!user.isAuthenticated && !user.loading) {
        setAlert("Please login first", "danger");
        return <Redirect to="/" />
      }

  return (
      report.loading || user.loading?"Loading...":
      <div >
          <Button onClick={()=>history.push("/dashboard")} style={{margin:"50px"}}>Go back to parking menu</Button>
    <Table style={{textAlign:"center"}}>
      <thead>
        <tr>
          <th>#</th>
          <th>Zone</th>
          <th>Space</th>
          <th># of booking</th>
          <th># of Vehicle</th>
        </tr>
      </thead>
      <tbody>
          {
              !report.length?"NO records found!":report.map((report,i)=>{
              return  <tr key={report.space}>
                   <th scope="row">{i+1}</th>
                <td>{report.zone}</td>
                <td>{report.space}</td>
                <td>{report.total}</td>
                <td>{report.booked?1:0}</td>
              </tr>
              })
          }
        
        
      </tbody>
    </Table>
    </div>
  );
}
function mapStateToProps(state){
    return{
        report:state.parking.report,
        user:state.user
    }
}

export default connect(mapStateToProps,actions)(Report);