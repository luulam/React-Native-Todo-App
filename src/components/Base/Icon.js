import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors, constants } from '../../configs';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * 
 * @return <Text/>
 */

let IconApp = ({
    style,
    name,
    size,
    color,
    onPress,
    disable
}) => {
    return (
        <TouchableOpacity
            disabled={disable}
            activeOpacity={constants.opacity}
            onPress={onPress}
            style={[style, styles.containers]}>
            <Icon
                style={styles.icon}
                name={name}
                size={size}
                color={color} />
        </TouchableOpacity>
    );
};

let styles = StyleSheet.create({
    containers: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        height: constants.icon,
        width: constants.icon
    },
    icon: {
        backgroundColor: 'transparent',
        textAlign: 'center'
    }
});

IconApp.propTypes = {
    style:PropTypes.any,
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    onPress: PropTypes.func,
    disable: PropTypes.bool
};

IconApp.defaultProps = {
    name: 'ios-bug-outline',
    size: constants.font.icon,
    color: colors.text,
    disable: false
};

export default IconApp;
