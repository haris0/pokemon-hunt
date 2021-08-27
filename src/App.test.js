import React from 'react';
import { shallow } from 'enzyme';
import App from './App';


describe('Root App', () => {
  it('Render App without crashing', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
})