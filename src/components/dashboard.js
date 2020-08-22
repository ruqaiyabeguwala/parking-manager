import React from "react";
//import { Row, Col, Button, Card } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "./../actions/index";
import MyCard from "./myCard";
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

function Dashboard({ space, getSpace, sortSpace, filterSpace,user,setAlert,logout }) {
  
  let ifVehicle;
  React.useEffect(() => {
    console.log("into useffect");
    getSpace();
  }, []);
  //const [ifVehicle, setifVehicle] = React.useState(!!space.vehicle);
  let bg;
  if (!user.isAuthenticated && !user.loading) {
    setAlert("Please login first", "danger");
    return <Redirect to="/" />
  }
  return (
    <div>
      {console.log("dashboard")}
      <Row style={{ margin: "50px 50px" }}>
        <Button style={{ margin: "10px" }} onClick={() => filterSpace(true)}>
          Initialize
        </Button>
        <Button style={{ margin: "10px" }} onClick={() => getSpace()}>
          Get all spaces
        </Button>
        <Button style={{ margin: "10px" }} onClick={()=>sortSpace(true)}>
          Sort
        </Button>
        <Button style={{ margin: "10px" }} onClick={()=>filterSpace(true)}>
          Filter booked spaces
        </Button>
        <Button style={{ margin: "10px" }} onClick={() => filterSpace(false)}>
          Filter empty spaces
        </Button>
        <Button style={{ margin: "10px" }} onClick={() => logout()}>
          Logout
        </Button>
      </Row>
      <Row style={{ margin: "20px" }}>
        {space.map((space) => {
          return (
            <Col md={2} sm={4} lg={3} key={space._id}>
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
