// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';

// Enzyme
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Components
import Chessboard from 'chessboardjsx';
import Game from './Components/Game';

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

describe('Chessboard', function() {
  it('renders a Chessboard component', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.find(Chessboard)).toHaveLength(1)
  });

  // Write Chessboard unit tests here
});

describe('Move counter', function() {
  // Write Move counter unit tests here
});

describe('Text input', function() {
  // Write Text input unit tests here
});