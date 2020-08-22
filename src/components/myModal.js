import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { connect } from "react-redux";
import * as actions from "./../actions";

const ModalExample = (props) => {
  const { bookVehicle, ifVehicle, space, releaseVehicle } = props;

  const [modal, setModal] = useState(false);
  const [regNumber, setRegNumber] = useState("");
  const toggle = () => setModal(!modal);
  const handleSubmit = () => {
    bookVehicle(space.title, regNumber, () => {
      toggle();
      // forceUpdate()
    });
  };
  const handleRelease = () => {
    console.log(space.vehicle._id);
    releaseVehicle(space.vehicle._id);
    // forceUpdate()
    //toggle()
  };

  return (
    <div>
      <Button onClick={!ifVehicle ? toggle : handleRelease}>
        {ifVehicle ? "Release" : "Book"}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Book space {space.title}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="reg">Enter vehicle registration number</Label>
              <Input
                required
                type="text"
                name="reg"
                id="reg"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
              />
            </FormGroup>
            <Button onClick={handleSubmit}>Book</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default connect(null, actions)(ModalExample);
