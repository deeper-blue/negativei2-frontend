import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import { Route, BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const app = (
    <BrowserRouter>
        <Route component={Game} />
    </BrowserRouter>
  );
  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});
