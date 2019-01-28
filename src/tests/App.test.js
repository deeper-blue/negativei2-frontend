import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { Route, BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const app = (
    <BrowserRouter>
        <Route component={App} />
    </BrowserRouter>
  );
  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});
