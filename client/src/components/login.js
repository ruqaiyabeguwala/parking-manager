import React from "react";
import { Form, Button, Input, FormGroup ,Row,Col,} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "./../actions/index";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css"
import park from "./../assets/img/park.jpg"

const handleInput = (field) => {
  return (
    <FormGroup className="m-2">
      <Input
        className={
          field.meta.touched
            ? field.meta.error
              ? "border border-danger"
              : ""
            : ""
        }
        type={field.type}
        placeholder={field.placeholder}
        {...field.input}
      />
      <div className="text-danger">
        {" "}
        {field.meta.touched ? field.meta.error : ""}
      </div>
    </FormGroup>
  );
};

const Login = ({
  user,
  loginUser,
  setAlert,
  handleSubmit,
  pristine,
  submitting,
  invalid,
}) => {

  if (user.isAuthenticated && !user.loading) {
     setAlert("Logging you in!","success");
    return <Redirect to="/dashboard" />;
  }
  return (
      <div
        style={{
          minHeight: "550px",
        }}
      >
        <h1 style={{textAlign:"center",color:"#472d1e",marginTop:"20px"}}>Welcome to Parking mania!</h1>
        <Row style={{ padding:"40px" }}>
            <Col md={6}>
                <img src={park} width="100%" height="450px"/>
            </Col >
            <Col md={6} style={{marginTop:"100px",}}>
          <Form
            onSubmit={handleSubmit((values) => {
               console.log(values)
              loginUser(values);
            })}
          >
            <Field
              name="email"
              placeholder="Enter email"
              component={handleInput}
              className="form-control"
              required
            />

            <Field
              name="password"
              type="password"
              placeholder="Enter password"
              component={handleInput}
              className="form-control"
              required
            />
            <Button className="btn btn-danger" disabled={pristine || submitting || invalid}>Login</Button>
          </Form>
          </Col>
        </Row>
       
      </div>
  );
};

function validate(values) {
  const errors = [];
  if (!values.email) {
    errors.email = "Enter an email";
  }
  if (/.+@.+\..+/.test(values.email) === false) {
    errors.email = "Please enter a proper email ";
  }
  if (!values.password) {
    errors.password = "Enter a password";
  }

  return errors;
}
function mapStateToProps(state) {
  return { user: state.user };
}
export default reduxForm({ validate, form: "login" })(
  connect(mapStateToProps, actions)(Login)
);
