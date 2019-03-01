import React from 'react';
import { mount, shallow } from 'enzyme';
//import { createShallow } from '@material-ui/core/test-utils';

import ComponentActions from '../src/components/editor/components/component-actions';

const mock = () => (
  <div>
    <span className="aaaaa" />
  </div>
);
describe('ComponentActions render with edit false', () => {
  // const shallow = createShallow();

  const Component = ComponentActions(mock);
  const wrapper = mount(<Component edit={false} />);

  it('it should render 2 divs with button role', () => {
    expect(wrapper.find('[role="button"]')).toHaveLength(2);
  });

  it('should mount ComponentToolbar on mouseover', () => {
    const main = wrapper.find('[role="button"]').first();
    expect(wrapper.find('ComponentToolbar')).toHaveLength(0);
    main.simulate('mouseover');
    expect(wrapper.find('ComponentToolbar')).toHaveLength(1);
  });
});

describe('ComponentActions render with edit true', () => {
  // const shallow = createShallow();

  const Component = ComponentActions(mock);
  const wrapper = mount(<Component edit={true} />);

  it('it should render Paper', () => {
    expect(wrapper.find('Paper')).toHaveLength(1);
  });
});
