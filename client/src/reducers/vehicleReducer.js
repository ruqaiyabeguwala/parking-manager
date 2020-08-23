import {
  RELEASE_VEHICLE_FAIL,
  SORT_SPACE,
  RELEASE_VEHICLE,
  GET_SPACE,
  GET_SPACE_FAIL,
  BOOK_VEHICLE,
  BOOK_VEHICLE_FAIL,
  FILTER_SPACE,
  FILTER_SPACE_FAIL,
  INIT_SPACE,
  INIT_SPACE_FAIL,
  GET_REPORT,
  GET_REPORT_FAIL
} from "./../actions/types";
const initState = {
  loading: true,
  vehicle: [],
  space: [],
  error: [],
  report:[]
};
export default function (state = initState, action) {
  switch (action.type) {
    case GET_SPACE:
      // console.log("login:",action.payload)
      return {
        ...state,
        loading: false,
        space: action.payload,
      };
      case INIT_SPACE:
        return{
          ...state,
          loading:false,
          space:action.payload
        }
    case BOOK_VEHICLE:
    case RELEASE_VEHICLE:
      return {
        ...state,
        loading: false,
        space: state.space.map((space) =>
          space._id === action.payload._id ? action.payload : space
        ),
      };
      case GET_REPORT:{
        return{
          ...state,
          loading:false,
          report:action.payload
        }
      }
    case SORT_SPACE:
     // let sortAlphaNum = (a, b) =>a.title.localeCompare(b.title, "en", { numeric: true });
      return {
        ...state,
        loading: false,
        space: action.payload,
      };
    case FILTER_SPACE:
      let isVehicle = action.payload.type;
      return {
        ...state,
        loading: false,
        space: action.payload.res.data.filter((s) => {
          if (isVehicle) return s.vehicle !== null;
          else return s.vehicle === null;
        }),
      };

    case GET_SPACE_FAIL:
    case BOOK_VEHICLE_FAIL:
    case RELEASE_VEHICLE_FAIL:
    case FILTER_SPACE_FAIL:
    case INIT_SPACE_FAIL:
      case GET_REPORT_FAIL:
      //  console.log("auth fail")
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
