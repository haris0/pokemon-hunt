import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';
import MainPage from './MainPage';

describe('Main Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App>
        <MainPage />
      </App>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  })

  it('Render Main Page without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
})