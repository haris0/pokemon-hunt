import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';
import CollectionPage from './CollectionPage';

describe('Collection Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App>
        <CollectionPage />
      </App>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  })

  it('Render Collection Page without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
})