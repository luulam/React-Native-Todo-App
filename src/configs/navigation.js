import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from '../components';
//all screen
import Splash from '../screens/splash';
import MyList from '../screens/myList';
import DetailList from '../screens/detailList';
import Setting from '../screens/setting';

import { colors, styleApp, constants } from '../configs';
import { icon } from '../assets';

const getIconTab = (name) => ({ tintColor }) => (
    <Icon name={name} color={tintColor} disable />
);

const Navigation = StackNavigator(
    {
        Splash: {
            screen: Splash
        },
        MainTab: {
            screen: TabNavigator({
                MainMyList: {
                    screen: StackNavigator(
                        {
                            MyList: {
                                screen: MyList
                            },
                            DetailList: {
                                screen: DetailList
                            }
                        },
                        {
                            initialRouteName: 'MyList',
                            headerMode: 'none',
                            cardStyle: {
                                ...styleApp.disable_shadow,
                                backgroundColor: colors.bg_app,
                            },

                        }
                    ),
                    navigationOptions: {
                        tabBarLabel: 'Task',
                        tabBarIcon: getIconTab(icon.home)
                    }
                },
                Setting: {
                    screen: Setting,
                    navigationOptions: {
                        tabBarLabel: 'Setting',
                        tabBarIcon: getIconTab(icon.setting)
                    }
                }
            }, {
                    tabBarComponent: TabBarBottom,
                    tabBarPosition: 'bottom',
                    swipeEnabled: false,
                    lazy: true,
                    tabBarOptions: {
                        activeTintColor: 'black',
                        inactiveTintColor: colors.border,
                        showLabel: true,
                        showIcon: true,
                        style: {
                            ...styleApp.disable_shadow,
                            backgroundColor: colors.white,
                            height: constants.navBarHeight
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
            ...styleApp.disable_shadow,
            backgroundColor: colors.bg_app,
        },

    }
);

const mapStateToProps = (state) => ({ nav: state.nav });

export default connect(mapStateToProps)(Navigation);
