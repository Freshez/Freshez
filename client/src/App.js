import './App.css';
import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser, login } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Login from './components/modal/Login';
import Register from './components/modal/Register';
import CreateVendorProfile from './components/modal/CreateVendorProfile';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

console.log('store');

console.log(store.getState());

Modal.setAppElement(document.getElementById('root'));

const App = () => {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const [createvendorprofilestate, setValue] = React.useState(
    localStorage.getItem('createvendorprofile') || ''
  );
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
          <Register />
          <Login />
          <CreateVendorProfile />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
