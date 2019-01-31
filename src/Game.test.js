// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';

// Enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';

// Components
import Chessboard from 'chessboardjsx';
import Game from './Components/Game';
import HumanVsHuman from './Components/Game/HumanVsHuman.jsx';

describe(Game, function() {
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

  describe(HumanVsHuman, function() {
    it('renders a HumanVsHuman component', () => {
      const wrapper = shallow(<Game />);
      expect(wrapper.find(HumanVsHuman).exists()).toBe(true);
    });
  });

  describe('Move tracker', function() {
    // Write move tracker unit tests here
  });

  describe('Text input', function() {
    // Write text input unit tests here
  });
});