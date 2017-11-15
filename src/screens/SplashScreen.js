import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image } from 'react-native';
import { } from '../components';
import { Constants } from '../configs';
import { Images } from '../assets';
import { NavigationActions } from 'react-navigation'

class Splash extends Component {
    componentDidMount() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'MainTab' })
            ]
        });

        setTimeout(_ => {
            this.props.navigation.dispatch(resetAction);
        }, 1000);
    }




    render() {
        return (
            <View
                style={styles.containers}
            >
                <Image source={Images.logo} style={styles.logo} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containers: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        flex: 1
    },
    logo: {
        width: 60,
        height: 60
    }
});

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
