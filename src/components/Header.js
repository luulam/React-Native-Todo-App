import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from './';
import { constants, styleApp } from '../configs';
import { icon } from '../assets';

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
    backPress,
    center
}) => {
    return (
        <View
            style={style}
        >
            <View
                style={styles.containerRow}
            >
                {backPress
                    ? <Icon
                        name={icon.back}
                    />
                    : null}
                {left}
            </View>

            <View
                style={styles.containerRow}
            >
                {children}
            </View>

            {title ?
                <Text
                    style={styles.containerCenter}
                    align={'center'}
                    text={title}
                    fontSize={constants.font.header}
                    bold
                />
                : null}

        </View>
    );
};

let styles = StyleSheet.create({
    containers: {
        paddingHorizontal: constants.padHor,
        height: constants.navBarHeight,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...styleApp.shadow
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
