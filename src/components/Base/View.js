import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

/**
 * 
 * @param 
 * @return <View/>
 */

let ViewApp = ({
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
            <View style={disable ? styles.containersDisable : null} />
        </TouchableOpacity>
    );
};

let styles = StyleSheet.create({
    containersDisable: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, .8)'
    }
});

ViewApp.propTypes = {
    disable: PropTypes.bool,
    disTouch: PropTypes.bool
};

ViewApp.defaultProps = {
    disable: false,
    disTouch: true
};


export default ViewApp;
