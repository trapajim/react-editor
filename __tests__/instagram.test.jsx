import React from 'react';
import { shallow } from 'enzyme';
import Instagram from '../src/components/editor/components/instagram';
import ComponentToolbar from '../src/components/editor/components/component-toolbar';

describe('<Instagram edit/>', () => {
  const parent = shallow(<Instagram edit="ff" userId="ff" />);
  const component = parent
    .dive()
    .find('Instagram')
    .dive();

  it('it should render the ComponentToolbar', () => {
    expect(parent.dive().find(ComponentToolbar)).toHaveLength(1);
  });

  it('it should render 1 inputs', () => {
    expect(component.find('TextField')).toHaveLength(1);
  });
});
