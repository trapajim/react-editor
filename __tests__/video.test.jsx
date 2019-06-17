import React from 'react';
import { shallow } from 'enzyme';
import Video, { parseUrl } from '../src/components/editor/components/video';
import ComponentToolbar from '../src/components/editor/components/component-toolbar';

describe('<Video edit/>', () => {
  const parent = shallow(<Video edit="ff" userId="ff" />);

  const component = parent
    .dive()
    .find('Video')
    .dive();

  it('it should render the ComponentToolbar', () => {
    expect(parent.dive().find(ComponentToolbar)).toHaveLength(1);
  });

  it('it should render 1 input', () => {
    expect(component.find('TextField')).toHaveLength(1);
  });
});

describe('parseUrl', () => {
  const testUrl = {
    yt: 'https://www.youtube.com/watch?v=yZ2jqBkglao',
    vimeo: 'https://vimeo.com/10679287',
  };
  const embedUrl = {
    yt: '//www.youtube.com/embed/yZ2jqBkglao',
    vimeo: '//player.vimeo.com/video/10679287',
  };
  it('should return an youtube embed url', () => {
    const result = parseUrl(testUrl.yt);
    expect(result).toBe(embedUrl.yt);
  });
  it('should return an vimeo embed url', () => {
    const result = parseUrl(testUrl.vimoe);
    expect(result).toBe(embedUrl.vimoe);
  });
  it('should return an instagram embed code', () => {
    const result = parseUrl(testUrl.yt);
    expect(result).toBe(embedUrl.yt);
  });
});
