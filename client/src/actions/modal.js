import axios from 'axios';
import { setAlert } from './alert';
import {
  LOGIN_OPEN,
  LOGIN_CLOSED,
  REGISTER_OPEN,
  REGISTER_CLOSED,
  CREATE_VENDOR_PROFILE_OPEN,
  CREATE_VENDOR_PROFILE_CLOSED,
  CREATE_CUSTOMER_PROFILE_OPEN,
  CREATE_CUSTOMER_PROFILE_CLOSED,
} from './types';

// Open login modal
export const openLoginModal = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_OPEN,
    });
  } catch (err) {}
};

// Close login modal
export const closeLoginModal = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_CLOSED,
    });
  } catch (err) {}
};

// Open login modal
export const openRegisterModal = () => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_OPEN,
    });
  } catch (err) {}
};

// Close login modal
export const closeRegisterModal = () => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_CLOSED,
    });
  } catch (err) {}
};

// Open create vendor profile modal
export const openCreateVendorProfileModal = () => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_VENDOR_PROFILE_OPEN,
    });

    console.log('yes');
  } catch (err) {
    console.log('no');
  }
};

// Close create vendor profile modal
export const closeCreateVendorProfileModal = () => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_VENDOR_PROFILE_CLOSED,
    });
  } catch (err) {}
};

// Open create customer profile modal
export const openCreateCustomerProfileModal = () => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CUSTOMER_PROFILE_OPEN,
    });
  } catch (err) {}
};

// Close create customer profile modal
export const closeCreateCustomerProfileModal = () => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CUSTOMER_PROFILE_CLOSED,
    });
  } catch (err) {}
};
