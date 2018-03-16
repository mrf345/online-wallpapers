import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import MainApp from './App'
import { Provider } from 'react-redux'
import store from './ReduxIt'

const App = () => (
    <Provider store={store}>
        <MainApp />
    </Provider>
)

AppRegistry.registerComponent('OnlineBackgrounds', () => App);
