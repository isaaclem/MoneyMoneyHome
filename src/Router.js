import React from 'react';
import { createBottomTabNavigator, createStackNavigator, StackActions } from 'react-navigation';
import { Icon, Button, View } from 'native-base';

import Strings from './Strings';
import { 
  SummaryScreen,
  SettingScreen,
  AccountCreationScreen,
  AccountListScreen
} from './screens';

const PRIMARY_COLOR = '#50565B';
const STANDARD_NAVIGATION_OPTION = {
  backtitle: null,
  headerStyle: {
    backgroundColor: PRIMARY_COLOR
  },
  headerTintColor: 'white'
};

const MainNavigator = createBottomTabNavigator({ 
  summary: {
    screen: createBottomTabNavigator({
      summary: {
        screen: createStackNavigator({
          summary: {
            screen: SummaryScreen,
            navigationOptions: {
              ...STANDARD_NAVIGATION_OPTION,
              title: Strings.labelSummary
            }
          }
        }, {
          headerMode: 'screen'
        }),
        navigationOptions: () => ({
          tabBarLabel: Strings.labelSummary,
          tabBarIcon: ({ tintColor }) => <Icon type='MaterialIcons' name='speaker-notes' style={{ color: tintColor, fontSize: 25 }} />,
        }),
      },
      account: {
        screen: createStackNavigator({
          account: {
            screen: AccountListScreen,
            navigationOptions: ({ navigation }) => {
              return {
                ...STANDARD_NAVIGATION_OPTION,
                title: Strings.labelAccount,
                headerRight: (
                  <Button
                    transparent
                    onPress={() => navigation.navigate('accountCreation')}
                  >
                    <Icon name='plus' type='Entypo' style={{ color: 'white' }} />
                  </Button>
                ),
              };
            }
          },
          accountCreation: {
            screen: AccountCreationScreen,
            navigationOptions: ({ navigation }) => {
              return {
                ...STANDARD_NAVIGATION_OPTION,
                title: Strings.labelCreateAccount,
                headerLeft: (
                  <Button
                    transparent
                    onPress={() => navigation.goBack()}
                  >
                    <Icon name='chevron-left' type='Entypo' style={{ color: 'white' }} />
                  </Button>
                )
              };
            }
          }
        }, {
          headerMode: 'screen'
        }),
        navigationOptions: () => ({
          tabBarLabel: Strings.labelAccount,
          tabBarIcon: ({ tintColor }) => <Icon type='MaterialCommunityIcons' name='book-multiple' style={{ color: tintColor, fontSize: 25 }} />,
        }),
      },
      setting: {
        screen: createStackNavigator({
          setting: {
            screen: SettingScreen,
            navigationOptions: {
              ...STANDARD_NAVIGATION_OPTION,
              title: Strings.labelSetting
            }
          }
        }, {
          headerMode: 'screen'
        }),
        navigationOptions: () => ({
          tabBarLabel: Strings.labelSetting,
          tabBarIcon: ({ tintColor }) => <Icon type='FontAwesome' name='gear' style={{ color: tintColor, fontSize: 25 }} />,
        }),
      },
    }, {
      tabBarPosition: 'bottom',
      tabBarOptions: {
        labelStyle: { fontSize: 12 },
        activeTintColor: '#297ED8',
      }
    })
  },
}, {
  navigationOptions: {
    tabBarVisible: false
  },
  lazy: false
});

export default MainNavigator;
