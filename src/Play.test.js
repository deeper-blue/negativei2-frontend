// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';

// Enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { mount } from 'enzyme';

// Components
import Play from './Components/Play';
import HumanVsHuman from './Components/Play/HumanVsHuman.jsx';
import Spinner from './Components/Spinner';

describe(Play, function() {
  describe(HumanVsHuman, function() {
    it('renders a HumanVsHuman component', () => {
      const wrapper = mount(<Play />);
      expect(wrapper.find(Spinner).exists()).toBe(true);
    });
  });

  describe('Move tracker', function() {
    // Write move tracker unit tests here
  });

  describe('Text input', function() {
    // Write text input unit tests here
  });
});