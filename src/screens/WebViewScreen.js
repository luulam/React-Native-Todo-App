import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, WebView } from 'react-native';
import { Header, Icon, Text } from '../components';
import { Constants, Colors } from '../configs';
import { Icons } from '../assets'
class WebViewScreen extends Component {
    state = {
        loading: true
    }
    render() {
        const { params, navigation } = this.props;

        const left = <Icon
            size={Constants.font.h2 * 1.2}
            color={Colors.white}
            name={Icons.close}
            onPress={() => navigation.goBack()} />;
        const center = <Text color={Colors.white} text={params.title} />;

        const right = this.state.loading ? <ActivityIndicator
            size={'small'}
            color={Colors.white} /> : null;

        return (
            <View
                style={styles.containers}
            >
                <Header
                    left={left} center={center} right={right} backgroundColor={'#24292e'} />
                <WebView
                    source={{ uri: params.url }}
                    style={{ flex: 1 }}
                    onLoadStart={() => this.setState({ loading: true })}
                    onLoadEnd={() => this.setState({ loading: false })}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containers: {
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
const mergeProps = (stateProps, dispatchProps, ownProps) =>
    Object.assign({}, ownProps, dispatchProps, stateProps, {
        ...ownProps.navigation.state
    });
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WebViewScreen);
