import React from 'react';
import { mount, shallow } from 'enzyme';
import Rank from './Rank';

describe('Rank', () => {
  it('renders correctly', () => {
    const component = shallow(<Rank />);
    expect(component).toMatchSnapshot();
  });

  it('displays name', () => {
    const component = mount(<Rank name="John" />);
    const greeting = component.find('div#name');
    expect(greeting.text().includes("John")).toBeTruthy();
    component.unmount();
  });

  it('displays number of entries', () => {
    const component = mount(<Rank entries="5" />);
    const entries = component.find('div#entries');
    expect(entries.text().includes("5")).toBeTruthy();
    component.unmount();
  });
});