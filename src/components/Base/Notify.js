import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text } from '../';
import { Colors, Constants, Style } from '../../configs';


class Notify extends Component {
    static propTypes = {
        notifys: PropTypes.array,
    }

    static defaultProps = {
        notifys: []
    }

    _renderNotify = (v, i) => {
        return (
            <View
                style={styles.border}
                key={i}>
                <Text
                    color={Colors.text_light}
                    text={v.title} />
            </View>
        );
    }

    render() {
        let { notifys } = this.props;
        return (
            <View style={styles.containers}>
                {notifys.map(this._renderNotify)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containers: {
        bottom: Constants.padVer * 2,
        left: 0,
        right: 0,
        justifyContent: 'center',
        position: 'absolute',
    },
    border: {
        backgroundColor: Colors.access,
        padding: Constants.pad,
        marginBottom: Constants.padVer,
        marginHorizontal: Constants.padHor * 2,
        height: Constants.btnHeight,
        borderRadius: Constants.btnHeight / 2,
        alignItems: 'center',
        justifyContent: 'center',
        ...Style.shadow
    },
    text: {
        color: Colors.text_light
    }
});

const mapStateToProps = (state) => {
    return {
        notifys: state.app.notifys,
    };
};

export default connect(mapStateToProps)(Notify);
