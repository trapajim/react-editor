import React from 'react';
import { shallow } from 'enzyme';
import Title from '../src/components/editor/components/title';
import ComponentToolbar from '../src/components/editor/components/component-toolbar';

describe('<Title edit/>', () => {
  const parent = shallow(<Title edit />);
  const component = parent
    .dive()
    .find('Title')
    .dive();

  it('it should render the ComponentToolbar', () => {
    expect(component.find(ComponentToolbar)).toHaveLength(1);
  });

  describe('trigger on change event for form components', () => {
    const text = 'Your new Value';
    component.find('TextField').simulate('change', { target: { value: text } });

    it('it should change te content text state', () => {
      expect(component.state().content.text).toEqual(text);
    });

    it('should calculate the text length', () => {
      expect(component.state().textLength).toEqual(text.length);
    });

    it('should trigger on change event for Select', () => {
      component
        .find('Select')
        .simulate('change', { target: { value: 'heading' } });
      expect(component.state().headingType).toEqual('heading');
    });
  });
});
