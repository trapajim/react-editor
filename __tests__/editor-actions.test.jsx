import React from 'react';
import { mount } from 'enzyme';
import Paper from '@material-ui/core/Paper';
import EditorActions from '../src/components/editor/components/editor-actions';

describe('<EditorActions show={false} />', () => {
  const component = mount(<EditorActions show={false} />);
  it('it should render a p element if editor is false', () => {
    expect(component.find(Paper)).toHaveLength(0);
  });
  it('it should toggle state on mouse over and mouse leave', () => {
    expect(component.find(Paper)).toHaveLength(0);
    component.first('div').simulate('mouseenter');
    expect(component.find(Paper)).toHaveLength(1);

    component.simulate('mouseleave');
    // Testing state after mouseleave
    expect(component.find(Paper)).toHaveLength(0);
    // Testing state after mouseover
  });
});
describe('<EditorActions show/>', () => {
  const component = mount(<EditorActions show />);
  it('it should render Paper ', () => {
    expect(component.find(Paper)).toHaveLength(1);
  });
});
