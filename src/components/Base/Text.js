import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { Colors, Constants } from '../../configs';

/**
 * 
 * @param ellipsizeMode {'head','middle','tail'} 
 * @return <Text/>
 */

let TextApp = ({
    text,
    bold,
    italic,
    upperCase,
    style,
    disable,
    color,
    fontSize,
    align,
    ellipsizeMode,
    numberOfLines,
    children,
    onPress,
    under
}) => {
    return <Text
        onPress={onPress}
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
        style={[style, {
            textAlign: align,
            color: disable ? Colors.disable : color,
            fontSize,
            fontWeight: bold ? 'bold' : undefined,
            fontStyle: italic ? 'italic' : undefined,
            textDecorationLine: under ? 'underline' : 'none'
        }]}
    >
        {upperCase ? text.toUpperCase() : text}
        {children}
    </Text>;
};

let styles = StyleSheet.create({
    containers: {

    }
});

TextApp.propTypes = {
    style: PropTypes.any,
    text: PropTypes.string,
    bold: PropTypes.bool,
    upperCase: PropTypes.bool,
    italic: PropTypes.bool,
    disable: PropTypes.bool,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    align: PropTypes.string,
    ellipsizeMode: PropTypes.string,
    numberOfLines: PropTypes.number,
    children: PropTypes.any,
    onPress: PropTypes.func,
    under: PropTypes.bool
};

TextApp.defaultProps = {
    color: Colors.text,
    fontSize: Constants.font.nomal,
    numberOfLines: undefined,
    ellipsizeMode: 'tail',
    style: styles.constant,
    align: 'left'
};

export default TextApp;
