import React from 'react';
import { shallow } from 'enzyme';
import Quote from '../src/components/editor/components/quote';
import ComponentToolbar from '../src/components/editor/components/component-toolbar';

describe('<Quote edit/>', () => {
  const parent = shallow(<Quote edit="ff" userId="ff" />);
  const component = parent
    .dive()
    .find('Quote')
    .dive();

  it('it should render the ComponentToolbar', () => {
    expect(parent.dive().find(ComponentToolbar)).toHaveLength(1);
  });

  it('it should render 2 inputs', () => {
    expect(component.find('TextField')).toHaveLength(2);
  });

  describe('trigger on change event for quote', () => {
    const text = 'Your new Value';
    it('should update textlength', () => {
      component
        .find('[label="quote"]')
        .simulate('change', { target: { value: text } }, 'quote');
      expect(component.state().textLength).toBe(text.length);
    });
  });

  describe('trigger on change event for url ', () => {
    const text = 'Your new Value';
    it('should not update textlength', () => {
      component.setState({ textLength: 0 });
      expect(component.state().textLength).toBe(0);
      component
        .find('[label="url"]')
        .simulate('change', { target: { value: text } }, 'url');
      expect(component.state().textLength).toBe(0);
    });
  });
});
