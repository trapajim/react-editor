import React from 'react';
import { shallow } from 'enzyme';
import QuoteView from '../src/components/editor/views/quote';

describe('<QuoteView />', () => {
  const component = shallow(
    <QuoteView content={{ quote: 'text', url: 'some source' }} />,
  );

  it('should render div', () => {
    expect(component.find('blockquote')).toHaveLength(1);
  });
});
