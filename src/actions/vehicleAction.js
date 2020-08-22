import {
  GET_SPACE,
  BOOK_VEHICLE,
  SORT_SPACE,
  GET_SPACE_FAIL,
  BOOK_VEHICLE_FAIL,
  RELEASE_VEHICLE,
  RELEASE_VEHICLE_FAIL,
  FILTER_SPACE,
  FILTER_SPACE_FAIL,
} from "./types";
import axios from "axios";
import { setAlert } from "./index";

export const getSpace = () => async (dispatch) => {
  try {
    const res = await axios.get("/vehicle/space");
    dispatch({
      type: GET_SPACE,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.response);
    //   const errors=err.response.data.errors;
    if (err.response.data) {
      err.response.data.errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
    dispatch({
      type: GET_SPACE_FAIL,
      payload: { msg: err.response.statusText, type: err.response.status },
    });
  }
};

export const bookVehicle = (space, reg_no, callback) => async (dispatch) => {
  try {
    const obj = {
      space: space,
      reg_no: reg_no,
    };
    const res = await axios.put("/vehicle/book", obj);
    dispatch({
      type: BOOK_VEHICLE,
      payload: res.data,
    });
    callback();
  } catch (err) {
    console.error(err.response);
    //   const errors=err.response.data.errors;
    if (err.response.data) {
      err.response.data.errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
    dispatch({
      type: BOOK_VEHICLE_FAIL,
      payload: { msg: err.response.statusText, type: err.response.status },
    });
  }
};

export const releaseVehicle = (id) => async (dispatch) => {
  try {
    const res = await axios.put("/vehicle/release", { id });
    dispatch({
      type: RELEASE_VEHICLE,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.response);
    //   const errors=err.response.data.errors;
    if (err.response.data) {
      err.response.data.errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
    dispatch({
      type: RELEASE_VEHICLE_FAIL,
      payload: { msg: err.response.statusText, type: err.response.status },
    });
  }
};

export const sortSpace = (type) => async (dispatch) => {
  try {
    dispatch({
      type: SORT_SPACE,
      payload:type
    });
  } catch (err) {
    console.error(err.response);
  }
};
export const filterSpace = (type) => async (dispatch) => {
  try {
      const res = await axios.get("/vehicle/space");
    dispatch({
      type: FILTER_SPACE,
      payload: {res,type},
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: FILTER_SPACE_FAIL,
    });
  }
};
