import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text, View } from './';
import { Constants, Colors } from '../configs';
import { connect } from 'react-redux';

/**
 * 
 * @param 
 * @return <View/>
 */

class HeaderApp extends Component {

    render() {
        const { selectEditCategory, selectEditTask, style,
            title,
            left,
            right,
            center } = this.props;
        return (
            <View
                disable={selectEditCategory !== undefined || selectEditTask !== undefined}
                style={[style, styles.containers, { justifyContent: title ? 'flex-start' : 'space-between' }]}
            >
                {
                    title ?
                        [ //header Title and right
                            <Text
                                key={'title'}
                                style={styles.containerTitle}
                                align={'left'}
                                text={title}
                                fontSize={Constants.font.header}
                                bold
                                color={Colors.access}
                            />,
                            <View key={'right'}>{right}</View>
                        ]
                        : //full header
                        [
                            <View key={'left'}>{left}</View>,
                            <View key={'center'} style={styles.containerCenter}>{center}</View>,
                            <View key={'right'}>{right}</View>
                        ]}

            </View>
        );
    }
}
let styles = StyleSheet.create({
    containers: {
        paddingHorizontal: Constants.padHor / 2,
        paddingVertical: Constants.padVer,
        height: Constants.navBarHeight,
        alignItems: 'center',
        flexDirection: 'row',
    },
    containerTitle: {
        flex: 1,
        paddingLeft: Constants.padHor / 2
    },
    containerRow: {
        flexDirection: 'row'
    },
    containerCenter: {
        zIndex: -1,
        position: 'absolute',
        left: Constants.padHor * 2,
        right: Constants.padHor * 2
    }
});

HeaderApp.propTypes = {
    style: PropTypes.any,
    title: PropTypes.string,
    children: PropTypes.any,
    left: PropTypes.any,
    backPress: PropTypes.func,
    center: PropTypes.any
};

HeaderApp.defaultProps = {
    style: styles.containers
};

const mapStateToProps = ({ category, task }) => ({
    selectEditCategory: category.selectEdit,
    selectEditTask: task.selectEdit,
});

export default connect(mapStateToProps)(HeaderApp);
