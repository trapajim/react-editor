import React from 'react';
import TitleIcon from '@material-ui/icons/TitleOutlined';
import TextFieldsIcon from '@material-ui/icons/TextFieldsOutlined';
import QuoteIcon from '@material-ui/icons/FormatQuoteOutlined';
import Title from './components/title';
import Text from './components/text';
import Quote from './components/quote';
import TitleView from './views/title';
import TextView from './views/text';
import QuoteView from './views/quote';

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
};
export const EditorComponentContext = React.createContext({
  components: DefaultComponents,
});
