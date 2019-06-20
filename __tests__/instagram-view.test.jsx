import React from 'react';
import { shallow } from 'enzyme';
import Instagram from '../src/components/editor/views/instagram';

describe('<InstagramView edit/>', () => {
  const checkApi = jest.spyOn(Instagram.prototype, 'checkAPI');
  const parent = shallow(
    <Instagram content={{ url: 'https://www.instagram.com/p/ByzzWOGpJSj/' }} />,
  );
  it('should render div', () => {
    expect(parent.find('div')).toHaveLength(1);
  });

  it('should call checkAPI', () => {
    expect(checkApi).toHaveBeenCalled();
  });
});
