import React from 'react';
import {View, Text} from 'react-native';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import {Provider} from 'react-redux';

import Screen from './navigation/StackNavigation';
import store from './store';
const client = new ApolloClient({
  uri: 'https://myshop-backend789.herokuapp.com/graphql',
});

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Screen />
        </ApolloProvider>
      </Provider>
    </ApplicationProvider>
  );
};

export default App;
