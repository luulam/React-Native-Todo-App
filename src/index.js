import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux';
import { StatusBar } from 'react-native';
import { Notify, Dialog, View } from './components';
import Navigation from './configs/Navigation';

export default () => {

  const store = createStore(reducers, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent" />

        <Navigation />

        <Notify />
        <Dialog />
      </View >
    </Provider >
  );
};
