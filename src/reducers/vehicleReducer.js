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
} from "./../actions/types";
const initState = {
  loading: true,
  vehicle: [],
  space: [],
  error: [],
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
    case BOOK_VEHICLE:
    case RELEASE_VEHICLE:
      return {
        ...state,
        loading: false,
        space: state.space.map((space) =>
          space._id === action.payload._id ? action.payload : space
        ),
      };
    case SORT_SPACE:
      let sortAlphaNum = (a, b) =>a.title.localeCompare(b.title, "en", { numeric: true });
      return {
        ...state,
        loading: false,
        space: state.space.sort((a,b)=>sortAlphaNum(a,b)),
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
