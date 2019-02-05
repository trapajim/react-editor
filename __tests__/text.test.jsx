import React from 'react';
import { shallow } from 'enzyme';
import CKEditor from 'ckeditor4-react';
import Text from '../src/components/editor/components/text';
import ComponentToolbar from '../src/components/editor/components/component-toolbar';

describe('<Text edit/>', () => {
  const parent = shallow(<Text edit />);
  const component = parent
    .dive()
    .find('Text')
    .dive();

  it('it should render the ComponentToolbar', () => {
    expect(parent.dive().find(ComponentToolbar)).toHaveLength(1);
  });

  it('it should render CKEditor', () => {
    expect(component.find(CKEditor)).toHaveLength(1);
  });

  describe('trigger on change event for CKEditor', () => {
    const text = 'Your new Value';
    it('should update textlength', () => {
      const editor = {
        getData() {
          return text;
        },
        document: {
          getBody() {
            return this;
          },
          getText() {
            return text;
          },
        },
      };
      component.find(CKEditor).simulate('change', { editor });
      expect(component.state().textLength).toBe(text.length);
    });
  });
});
