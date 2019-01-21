import React from 'react';
import { mount } from 'enzyme';

import BlogTitle from '../src/components/editor/components/static/blog-title';

describe('<BlogTitle editor={false} />', () => {
  const component = mount(<BlogTitle editor={false} />);
  it('it should render a h1 title element if editor is false', () => {
    expect(component.find('h1')).toHaveLength(1);
  });
});
describe('<BlogTitle editor/>', () => {
  const onChangeMock = jest.fn();
  const title = 'hello';
  const component = mount(
    <BlogTitle editor defaultValue={title} updateCurChar={onChangeMock} />,
  );

  it('it should render a input element with value', () => {
    expect(component.find('input')).toHaveLength(1);
    expect(component.find('input').props().value).toEqual(title);
  });

  it('should call onChange prop with input value', () => {
    component
      .find('input')
      .simulate('change', { target: { value: 'Your new Value' } });
    expect(component.state().val).toBe('Your new Value');
    expect(onChangeMock).toBeCalled();
  });
});
