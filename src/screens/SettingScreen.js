import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image, WebView } from 'react-native';
import { Text, View } from '../components';
import { Constants } from '../configs';
import { Images } from '../assets';

const NAME = 'Todo';
const VERRSION = 'Version : 1.0.0';
const About = `<!DOCTYPE html>
<html>

<head>
    <title>HTML Internal CSS</title>

    <style type="text/css">
        * {
            font-family: Verdana;
        }
    </style>
</head>

<body>
    <h1 style="text-align: center;">Star our GitHub repo
        <a href="https://github.com/luulam/todo">Todo</a>
    </h1>
    <p style="text-align: center;">You can Create pull requests, submit bugs, suggest new features or documentation updates ,Follow us on&nbsp;
        <a href="https://github.com/luulam">Github</a>&nbsp;🐾</p>
    <p style="text-align: center;">blog&nbsp;
        <a href="https://luulam.github.io">luulam.github.io</a>
    </p>
    <h2 style="text-align: center;">Key Features</h2>
    <p style="text-align: center;">redux (redux-thunk)</p>
    <p style="text-align: center;">custom View,Touch</p>
    <p style="text-align: center;">Gesture Responder System</p>
    <p style="text-align: center;">realm DB</p>
    <p style="text-align: center;">custom Dialog (using redux)</p>
    <p style="text-align: center;">custom Toast (using redux)</p>
    <p style="text-align: center;">boilerplate</p>
    <h3 style="text-align: center;">From Luulam</h3>
    <p style="text-align: center;">Enjoy&nbsp;🤘&nbsp;We're always happy to receive your feedback!</p>
</body>

</html>`;

class Setting extends Component {
    render() {
        return (
            <View
                style={styles.containers}
            >
                <View style={styles.containersTop}>
                    <Image source={Images.logo} style={styles.logo} />
                    <Text text={NAME} bold fontSize={Constants.font.h2} />
                    <Text text={VERRSION} italic fontSize={Constants.font.sub} />
                </View>
                <View style={styles.containersBottom}>
                    <WebView
                        scalesPageToFit={false}
                        source={{ html: About }}
                        style={{ flex: 1 }}
                        onNavigationStateChange={(event) => console.log('event', event)}
                        onShouldStartLoadWithRequest={(event) => {
                            if (event.navigationType && event.navigationType === "click") {
                                this.props.navigation.navigate('WebView', { url: event.url, title: event.title });
                                return false;
                            } else {
                                return true;
                            }
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containers: {
        paddingTop: Constants.statusBarHeight,
        flex: 1
    },
    containersTop: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containersBottom: {
        flex: 3,
    },
    logo: {
        width: 80,
        height: 80
    }
});

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
