import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import rootReducer from '../../../reducers';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import { openLoginModal, openRegisterModal } from '../../../actions/modal';
import configureMockStore from 'redux-mock-store';
import Enzyme, { mount, shallow, configure } from 'enzyme';
import { Link } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const mockStore = configureMockStore(middleware);

describe('My Connected React-Redux Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: null,
        loading: false,
      },
      modal: {
        login_open: false,
        register_open: false,
      },
      logout: null,
      regsiterModalOpen: false,
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar></Navbar>
          </Fragment>
        </Router>
      </Provider>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should dispatch an action on button click', () => {
    renderer.act(() => {
      document.getElementById('loginLink').props.onClick();
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(openLoginModal());
  });

  // it('should dispatch an action on button click', () => {
  //   renderer.act(() => {
  //     component.root.getElementById('registerLink').props.onClick();
  //   });
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  //   expect(store.dispatch).toHaveBeenCalledWith(openRegisterModal());
  // });
});
