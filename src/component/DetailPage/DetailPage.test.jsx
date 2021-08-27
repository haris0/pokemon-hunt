import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';
import DetailPage from './DetailPage';

describe('Detail Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App>
        <DetailPage />
      </App>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  })

  it('Render Detail Page without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
})