import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Text } from './';
import { constants, colors } from '../configs';

/**
 * 
 * @param 
 * @return <View/>
 */

let HeaderApp = ({
    style,
    title,
    children,
    left,
    right,
    backPress,
    center
}) => {
    return (
        <View
            style={[style, { justifyContent: title ? 'flex-start' : 'space-between' }]}
        >
            {title ?
                [ //header Title and right
                    <Text
                        key={'title'}
                        style={styles.containerTitle}
                        align={'left'}
                        text={title}
                        fontSize={constants.font.header}
                        bold
                        color={colors.access}
                    />,
                    <View key={'right'}>{right}</View>
                ]
                : //full header
                [
                    <View key={'left'}>{left}</View>,
                    <View key={'center'} style={styles.containerCenter}>{children}</View>,
                    <View key={'right'}>{right}</View>
                ]}

        </View>
    );
};

let styles = StyleSheet.create({
    containers: {
        paddingHorizontal: constants.padHor,
        paddingVertical: constants.padVer,
        height: constants.navBarHeight,
        alignItems: 'center',
        flexDirection: 'row',
    },
    containerTitle: {
        flex: 1,
    },
    containerRow: {
        flexDirection: 'row'
    },
    containerCenter: {
        zIndex: -1,
        position: 'absolute',
        left: 0,
        right: 0
    }
});

HeaderApp.propTypes = {
    style: PropTypes.any,
    title: PropTypes.string,
    children: PropTypes.any,
    left: PropTypes.any,
    backPress: PropTypes.func,
    center: PropTypes.string
};

HeaderApp.defaultProps = {
    style: styles.containers
};


export default HeaderApp;
