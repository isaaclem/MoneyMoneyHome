import React, { Component } from 'react';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import { Platform, NativeModules } from 'react-native';

import { switchLanguage } from '../src/Strings';
import Reactotron from '../ReactotronConfig';
import reducers from './reducers';
import offline from './Offline';
import MainNavigator from './Router';


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    this.store = Reactotron.createStore(
      reducers,
      undefined,
      compose(
        offline({ persistCallback: () => this.startApp() })
      )
    );
  }

  startApp = () => {
    const { auth, accountInfo } = this.store.getState();
    if (auth && auth.userProfile) {
      global.detrackToken = auth.userProfile.token;
      global.detrackRefreshToken = auth.userProfile.refresh_token;
    }

    if (accountInfo && accountInfo.locale) {
      switchLanguage(accountInfo.settingsLocale);
    } else {
      let fullSystemLanguage = '';

      if (Platform.OS === 'android') {
        fullSystemLanguage = NativeModules.I18nManager.localeIdentifier;
      } else {
        fullSystemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
      }
      switchLanguage(fullSystemLanguage);
    }

    this.setState({ rehydrated: true });
  }

  render() {
    if (!this.state.rehydrated) {
      return null;
    }

    return (
      <Provider store={this.store}>
        <MainNavigator />
      </Provider>
    );
  }
}

export default App;
