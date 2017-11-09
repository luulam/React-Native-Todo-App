import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Constants } from '../../configs';

/**
 * 
 * @param 
 * @return <View/>
 */

const ViewApp = ({
    style,
    disable,
    children,
    onPress,
    onLongPress,
    delayLongPress,
    disTouch,
    activeOpacity
}) => {
    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            style={style}
            disabled={disTouch}
            onPress={onPress}
            onLongPress={onLongPress}
            delayLongPress={delayLongPress}
        >
            {children}
            {disable ? <View style={styles.containersDisable} /> : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containersDisable: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, .9)'
    }
});

ViewApp.propTypes = {
    disable: PropTypes.bool,
    disTouch: PropTypes.bool
};

ViewApp.defaultProps = {
    disable: false,
    disTouch: true,
    activeOpacity: Constants.opacity
};


export default ViewApp;
