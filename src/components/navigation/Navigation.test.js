import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

const onRouteChange = jest.fn();

describe('Navigation', () => {
  it('renders correctly', () => {
    const component = shallow(<Navigation />);
    expect(component).toMatchSnapshot();
  });
  it('performs sign out', () => {
    const component = shallow(<Navigation onRouteChange={onRouteChange} />);
    component.find('#sign-out').simulate('click');
    expect(onRouteChange).toHaveBeenCalledWith('sign-in');
  });
});