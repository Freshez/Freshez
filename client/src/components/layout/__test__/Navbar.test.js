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

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

it('redners without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
        </Fragment>
      </Router>
    </Provider>,
    div
  );
});

describe('Render', () => {
  test('snapshot renders', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar></Navbar>
          </Fragment>
        </Router>
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
