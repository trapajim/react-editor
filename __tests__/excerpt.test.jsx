import React from 'react';
import { mount } from 'enzyme';

import Excerpt from '../src/components/editor/components/static/excerpt';

describe('<Excerpt editor={false} />', () => {
  const component = mount(<Excerpt editor={false} />);
  it('it should render a p element if editor is false', () => {
    expect(component.find('p')).toHaveLength(1);
  });
});
describe('<Excerpt editor/>', () => {
  const onChangeMock = jest.fn();
  const text = 'demo';
  const component = mount(
    <Excerpt editor defaultValue={text} updateCurChar={onChangeMock} />,
  );

  it('it should render a textarea with value', () => {
    expect(component.find('textarea')).toHaveLength(1);
    expect(component.find('textarea').props().value).toEqual(text);
  });

  it('should call onChange prop with input value', () => {
    component
      .find('textarea')
      .simulate('change', { target: { value: 'Your new Value' } });
    expect(component.state().val).toBe('Your new Value');
    expect(onChangeMock).toBeCalled();
  });
});
