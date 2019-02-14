import React from 'react';
import TitleIcon from '@material-ui/icons/TitleOutlined';
import TextFieldsIcon from '@material-ui/icons/TextFieldsOutlined';
import LinkIcon from '@material-ui/icons/LinkOutlined';
import QuoteIcon from '@material-ui/icons/FormatQuoteOutlined';
import Title from './components/title';
import Text from './components/text';
import Link from './components/link';
import Quote from './components/quote';

export const DefaultComponents = {
  title: {
    component: Title,
    icon: <TitleIcon fontSize="small" />,
    title: 'Title',
  },
  text: {
    component: Text,
    icon: <TextFieldsIcon fontSize="small" />,
    title: 'text',
  },
  link: {
    component: Link,
    icon: <LinkIcon fontSize="small" />,
    title: 'Link',
  },
  quote: {
    component: Quote,
    icon: <QuoteIcon fontSize="small" />,
    title: 'Quote',
  },
};
export const EditorComponentContext = React.createContext({
  components: DefaultComponents,
});
