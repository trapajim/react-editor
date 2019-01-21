import React from 'react';

export const DefaultComponents = ['./test.jsx'];
export const EditorContext = React.createContext({
  components: DefaultComponents,
});
