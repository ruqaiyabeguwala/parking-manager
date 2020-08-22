import React from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
} from "reactstrap";
import * as actions from "../actions";
import { connect } from "react-redux";
import MyModal from "./myModal";

const MyCard = ({ space, forceUpdate }) => {
  const [ifVehicle, setifVehicle] = React.useState(!!space.vehicle);
  let bg = ifVehicle ? "#b6b2b2" : "#bada55";
  return (
    <Card
      style={{
        textAlign: "center",
        marginBottom: "20px",
        minHeight: "170px",
        background: `${bg}`,
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
          forceUpdate={forceUpdate}
        />
      </CardBody>
    </Card>
  );
};

export default connect(null, actions)(MyCard);
