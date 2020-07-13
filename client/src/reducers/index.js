import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import vendorprofile from './vendorprofile';
import post from './post';
import modal from './modal';

export default combineReducers({ alert, auth, vendorprofile, post, modal });
