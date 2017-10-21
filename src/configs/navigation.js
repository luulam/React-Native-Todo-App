import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from '../components';
//all screen
import SplashScreen from '../screens/SplashScreen';
import ListCategoryScreen from '../screens/ListCategoryScreen';
import DetailListScreen from '../screens/DetailListScreen';
import SettingScreen from '../screens/SettingScreen';

import { Colors, Style, Constants } from '../configs';
import { Icons } from '../assets';

const getIconTab = (name) => ({ tintColor }) => (
    <Icon name={name} color={tintColor} disable />
);

const Navigation = StackNavigator(
    {
        Splash: {
            screen: SplashScreen
        },
        MainTab: {
            screen: TabNavigator({
                MainMyList: {
                    screen: StackNavigator(
                        {
                            ListCategory: {
                                screen: ListCategoryScreen
                            },
                            DetailList: {
                                screen: DetailListScreen
                            }
                        },
                        {
                            initialRouteName: 'ListCategory',
                            headerMode: 'none',
                            cardStyle: {
                                ...Style.disable_shadow,
                                backgroundColor: Colors.bg_app,
                            },

                        }
                    ),
                    navigationOptions: {
                        tabBarLabel: 'Task',
                        tabBarIcon: getIconTab(Icons.home)
                    }
                },
                Setting: {
                    screen: SettingScreen,
                    navigationOptions: {
                        tabBarLabel: 'Setting',
                        tabBarIcon: getIconTab(Icons.setting)
                    }
                }
            }, {
                    tabBarComponent: TabBarBottom,
                    tabBarPosition: 'bottom',
                    swipeEnabled: false,
                    lazy: true,
                    tabBarOptions: {
                        activeTintColor: 'black',
                        inactiveTintColor: Colors.border,
                        showLabel: true,
                        showIcon: true,
                        style: {
                            ...Style.disable_shadow,
                            backgroundColor: Colors.white,
                            height: Constants.navBarHeight
                        }
                    },

                }
            )
        }

    },
    {
        initialRouteName: 'Splash',
        headerMode: 'none',
        cardStyle: {
            ...Style.disable_shadow,
            backgroundColor: Colors.bg_app,
        },

    }
);

const mapStateToProps = (state) => ({ nav: state.nav });

export default connect(mapStateToProps)(Navigation);
