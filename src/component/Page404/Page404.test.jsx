import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';
import Page404 from './Page404';

describe('Page 404', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App>
        <Page404 />
      </App>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  })

  it('Render Page 404 without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
})