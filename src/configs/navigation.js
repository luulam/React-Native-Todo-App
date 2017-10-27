import React from 'react';
import { connect } from 'react-redux';
import { Easing, Animated } from 'react-native';
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
/**
 * see url
 * https://stackoverflow.com/questions/43974979/react-native-react-navigation-transitions
 */
let MyTransition = (index, position) => {
    const inputRange = [index - 1, index, index + 1];

    const opacity = position.interpolate({
        inputRange,
        outputRange: [0.8, 1, 1],
    });

    const scaleY = position.interpolate({
        inputRange,
        outputRange: ([0.8, 1, 1]),
    });

    return {
        opacity,
        transform: [
            { scaleY }
        ]
    };
};
let TransitionConfiguration = () => {
    return {
        // Define scene interpolation, eq. custom transition
        screenInterpolator: (sceneProps) => {

            const { position, scene } = sceneProps;
            const { index } = scene;

            return MyTransition(index, position);
        },
        transitionSpec: ({
            duration: 800,
            easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
            timing: Animated.timing,
        })
    }
};
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
                            transitionConfig: TransitionConfiguration,
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
