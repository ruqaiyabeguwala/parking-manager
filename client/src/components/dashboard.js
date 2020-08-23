import React from "react";
//import { Row, Col, Button, Card } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "./../actions/index";
import MyModal from "./myModal";
import {Redirect} from "react-router"
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Row,
} from "reactstrap";
import MyNavbar from "./navbar";

function Dashboard({ getSpace,space, user,setAlert }) {
  
  let ifVehicle;
  React.useEffect(() => {
    getSpace();
  }, []);
  if (!user.isAuthenticated && !user.loading) {
    setAlert("Please login first", "danger");
    return <Redirect to="/" />
  }
  return (
    user.loading || space.loading?"Loading...":
    <div>
      <MyNavbar/>
     
      <Row style={{ margin: "20px" }}>
        {!space.length && !space.loading?"No records found!":space.map((space) => {
          return (
            <Col md={3} sm={4} lg={3} key={space._id}>
              {(ifVehicle = !!space.vehicle)}

              {/* <MyCard space={s} forceUpdate={forceUpdate} /> */}
              <Card
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  minHeight: "170px",
                  background: `${ifVehicle ? "#b6b2b2" : "#bada55"}`,
                }}
              >
                <CardBody>
                  <CardTitle>
                    <h2>{space.title}</h2>
                  </CardTitle>
                  <CardSubtitle></CardSubtitle>
                  <CardText style={{ color: "#fff" }}>
                    {ifVehicle ? space.vehicle.reg_no : ""}
                  </CardText>
                  <MyModal
                    ifVehicle={ifVehicle}
                    space={space}
                    // forceUpdate={forceUpdate}
                  />
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
function mapStateToProps(state) {
  return { 
    space: state.parking.space,
    user:state.user
   };
}
export default connect(mapStateToProps, actions)(Dashboard);
