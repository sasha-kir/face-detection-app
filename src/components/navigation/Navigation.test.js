import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('renders correctly', () => {
    const component = shallow(<Navigation />);
  
    expect(component).toMatchSnapshot();
  });
});