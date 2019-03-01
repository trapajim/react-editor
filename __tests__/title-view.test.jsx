import React from 'react';
import { shallow } from 'enzyme';
import TitleView from '../src/components/editor/views/title';

describe('<Title content={{ headingType: "heading"}}/>', () => {
  const component = shallow(
    <TitleView
      content={{ headingType: 'heading', text: 'a' }}
      compid="test1"
    />,
  );

  it('should render Headine', () => {
    expect(component.find('Heading')).toHaveLength(1);
  });
});

describe('<Title content={{ headingType: "subHeading"}} />', () => {
  const component = shallow(
    <TitleView
      content={{ headingType: 'subHeading', text: 'a' }}
      compid="test1"
    />,
  );

  it('should render Headine', () => {
    expect(component.find('SubHeading')).toHaveLength(1);
  });
});
