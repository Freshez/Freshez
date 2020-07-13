import {
  LOGIN_OPEN,
  LOGIN_CLOSED,
  REGISTER_OPEN,
  REGISTER_CLOSED,
  CREATE_VENDOR_PROFILE_OPEN,
  CREATE_VENDOR_PROFILE_CLOSED,
  CREATE_CUSTOMER_PROFILE_OPEN,
  CREATE_CUSTOMER_PROFILE_CLOSED,
} from '../actions/types';

const initialState = {
  login_open: false,
  register_open: false,
  create_vendor_open: false,
  create_customer_open: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_OPEN:
      return {
        ...state,
        login_open: true,
      };
    case LOGIN_CLOSED:
      return {
        ...state,
        login_open: false,
      };
    case REGISTER_OPEN:
      return {
        ...state,
        register_open: true,
      };
    case REGISTER_CLOSED:
      return {
        ...state,
        register_open: false,
      };
    case CREATE_VENDOR_PROFILE_OPEN:
      localStorage.setItem('createvendorprofile', true);
      return {
        ...state,
        create_vendor_open: true,
      };
    case CREATE_VENDOR_PROFILE_CLOSED:
      localStorage.setItem('createvendorprofile', false);
      return {
        ...state,
        create_vendor_open: false,
      };
    case CREATE_CUSTOMER_PROFILE_OPEN:
      localStorage.setItem('createcustomerprofile', true);
      return {
        ...state,
        create_customer_open: true,
      };
    case CREATE_CUSTOMER_PROFILE_CLOSED:
      localStorage.setItem('createcustomerprofile', true);
      return {
        ...state,
        create_customer_open: false,
      };
    default:
      return state;
  }
}
