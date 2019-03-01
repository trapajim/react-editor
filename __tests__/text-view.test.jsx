import React from 'react';
import { shallow } from 'enzyme';
import TextView from '../src/components/editor/views/text';

describe('<TextView />', () => {
  const component = shallow(<TextView content={{ text: 'text' }} />);

  it('should render div', () => {
    expect(component.find('div')).toHaveLength(1);
  });
});
