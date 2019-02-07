import React from 'react';
import TitleIcon from '@material-ui/icons/TitleOutlined';
import TextFieldsIcon from '@material-ui/icons/TextFieldsOutlined';
import LinkIcon from '@material-ui/icons/LinkOutlined';
import QuoteIcon from '@material-ui/icons/FormatQuoteOutlined';
import VideoCam from '@material-ui/icons/VideocamOutlined';
import LiveTv from '@material-ui/icons/LiveTvOutlined';
import Photo from '@material-ui/icons/InsertPhotoOutlined';
import MobilePhone from '@material-ui/icons/MobileScreenShareOutlined';
import Location from '@material-ui/icons/LocationOnOutlined';
import Minimize from '@material-ui/icons/MinimizeOutlined';
import Info from '@material-ui/icons/InfoOutlined';
import ListAlt from '@material-ui/icons/ListAltOutlined';
import DeveloperBoard from '@material-ui/icons/DeveloperBoardOutlined';
import PresentToAll from '@material-ui/icons/PresentToAllOutlined';
import GroupWork from '@material-ui/icons/GroupWorkOutlined';
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
  videoCam: {
    component: <div />,
    icon: <VideoCam fontSize="small" />,
    title: 'Vidoe',
  },
  instagram: {
    component: <div />,
    icon: <LiveTv fontSize="small" />,
    title: 'Instagram',
  },
  picture: {
    component: <div />,
    icon: <Photo fontSize="small" />,
    title: 'Picture',
  },
  twitter: {
    component: <div />,
    icon: <MobilePhone fontSize="small" />,
    title: 'Twitter',
  },
  location: {
    component: <div />,
    icon: <Location fontSize="small" />,
    title: 'Location',
  },
  pageSeperator: {
    component: <div />,
    icon: <Minimize fontSize="small" />,
    title: 'Page seperator',
  },
  basicInformation: {
    component: <div />,
    icon: <Info fontSize="small" />,
    title: 'Basic informations',
  },
  custInformation: {
    component: <div />,
    icon: <ListAlt fontSize="small" />,
    title: 'Custom informations',
  },
  relatedArticles: {
    component: <div />,
    icon: <DeveloperBoard fontSize="small" />,
    title: 'Related Articles',
  },
  buttons: {
    component: <div />,
    icon: <PresentToAll fontSize="small" />,
    title: 'Buttons',
  },
  group: {
    component: <div />,
    icon: <GroupWork fontSize="small" />,
    title: 'Group',
  },
};
export const EditorComponentContext = React.createContext({
  components: DefaultComponents,
});
