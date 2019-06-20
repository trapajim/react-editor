import React from 'react';
import TitleIcon from '@material-ui/icons/TitleOutlined';
import TextFieldsIcon from '@material-ui/icons/TextFieldsOutlined';
import QuoteIcon from '@material-ui/icons/FormatQuoteOutlined';
import VideoIcon from '@material-ui/icons/VideoCallOutlined';

import Title from './components/title';
import Text from './components/text';
import Quote from './components/quote';
import Video from './components/video';
import Instagram from './components/instagram';

import TitleView from './views/title';
import TextView from './views/text';
import QuoteView from './views/quote';
import VideoView from './views/video';
import InstagramView from './views/instagram';

export const DefaultComponents = {
  title: {
    component: Title,
    icon: <TitleIcon fontSize="small" />,
    view: TitleView,
    title: 'Title',
  },
  text: {
    component: Text,
    icon: <TextFieldsIcon fontSize="small" />,
    view: TextView,
    title: 'text',
  },

  quote: {
    component: Quote,
    icon: <QuoteIcon fontSize="small" />,
    view: QuoteView,
    title: 'Quote',
  },

  video: {
    component: Video,
    icon: <VideoIcon fontSize="small" />,
    view: VideoView,
    title: 'Video',
  },
  instagram: {
    component: Instagram,
    icon: <VideoIcon fontSize="small" />,
    view: InstagramView,
    title: 'Instagram',
  },
};
export const EditorComponentContext = React.createContext({
  components: DefaultComponents,
});
