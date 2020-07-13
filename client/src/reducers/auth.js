import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  REGISTER_BUTTON_VENDOR,
  REGISTER_BUTTON_CUSTOMER,
  DESELECT_ROLE_BUTTON,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  vendorSelected: false,
  customerSelected: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case REGISTER_BUTTON_VENDOR:
      return {
        ...state,
        customerSelected: false,
        vendorSelected: true,
      };
    case REGISTER_BUTTON_CUSTOMER:
      return {
        ...state,
        vendorSelected: false,
        customerSelected: true,
      };
    case DESELECT_ROLE_BUTTON:
      return {
        ...state,
        customerSelected: false,
        vendorSelected: false,
      };
    default:
      return state;
  }
}
