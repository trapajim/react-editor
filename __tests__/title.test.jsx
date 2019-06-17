import React from 'react';
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
import Title from '../src/components/editor/components/title';
import ComponentToolbar from '../src/components/editor/components/component-toolbar';

describe('<Title edit/>', () => {
  const parent = shallow(<Title edit="ff" userId="ff" />);
  const component = parent
    .dive()
    .find('Title')
    .dive();

  it('it should render the ComponentToolbar', () => {
    expect(parent.dive().find(ComponentToolbar)).toHaveLength(1);
  });

  describe('trigger on change event for form components', () => {
    const text = 'Your new Value';
    it('should call handleTextChange', () => {
      const textChangeSpy = jest.spyOn(
        component.instance(),
        'handleTextChange',
      );
      component.instance().forceUpdate();
      component
        .find('TextField')
        .simulate('change', { target: { value: text } });
      expect(textChangeSpy).toBeCalled();
      textChangeSpy.mockClear();
    });

    it('should calculate the text length', () => {
      component
        .find('TextField')
        .simulate('change', { target: { value: text } });
      expect(component.state().textLength).toEqual(text.length);
    });

    it('should call handleOnChangeHeading', () => {
      const selectSpy = jest.spyOn(
        component.instance(),
        'handleOnChangeHeading',
      );
      component.instance().forceUpdate();
      component
        .find(Select)
        .simulate('change', { target: { value: 'heading' } });
      expect(selectSpy).toBeCalled();
      selectSpy.mockClear();
    });
  });
});
