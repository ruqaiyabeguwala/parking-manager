import React from "react";
import { Form, Button, Input, FormGroup } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "./../actions/index";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css"

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
        <div className="row" style={{ marginTop:"100px",padding:"40px" }}>
            <div className="col-sm-6">

            </div>
            <div className="col-sm-6">
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
            <Button disabled={pristine || submitting || invalid}>Login</Button>
          </Form>
          </div>
        </div>
       
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
