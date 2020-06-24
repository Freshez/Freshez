import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
} from '../actions/types';

const initialState = {
  vendorprofile: null,
  customerprofile: null,
  vendorprofiles: [],
  customerprofiles: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILES:
      return {
        ...state,
        vendorprofiles: payload,
        loading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        vendorprofile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        vendorprofile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        vendorprofile: null,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
}
