// React
import React from 'react';
import { Redirect } from 'react-router-dom';

// Enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';

// Components
import Logout from './Components/Logout';

describe(Logout, function() {
    it('always redirects to login', () => {
        const wrapper = shallow(<Logout />);
        expect(wrapper.find(Redirect).exists()).toBe(true);
    });
});