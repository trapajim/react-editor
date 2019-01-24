import React from 'react';

import TitleIcon from '@material-ui/icons/TitleOutlined';
import TextFieldsIcon from '@material-ui/icons/TextFieldsOutlined';
import Link from '@material-ui/icons/LinkOutlined';
import Quote from '@material-ui/icons/FormatQuoteOutlined';
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

export const DefaultComponents = {
  title: {
    component: <div />,
    icon: <TitleIcon fontSize="small" />,
    title: 'Title',
  },
  textfield: {
    component: <div />,
    icon: <TextFieldsIcon fontSize="small" />,
    title: 'Textfield',
  },
  link: {
    component: <div />,
    icon: <Link fontSize="small" />,
    title: 'Link',
  },
  quote: {
    component: <div />,
    icon: <Quote fontSize="small" />,
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
export const EditorContext = React.createContext({
  updateComponents: () => {},
});
