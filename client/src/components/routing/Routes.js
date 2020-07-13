import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../layout/NotFound';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import VendorProfiles from '../profiles/vendor/VendorProfiles';
import VendorProfile from '../profile/vendor/VendorProfile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import CreateVendorProfile from '../profile-form/CreateVendorProfile';
import EditVendorProfile from '../profile-form/EditVendorProfile';
import PrivateRoute from '../routing/PrivateRoute';
const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/vendorprofiles' component={VendorProfiles} />
        <Route exact path='/vendorprofile/:id' component={VendorProfile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute
          exact
          path='/create-vendor-profile'
          component={CreateVendorProfile}
        />
        <PrivateRoute
          exact
          path='/edit-vendor-profile'
          component={EditVendorProfile}
        />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
