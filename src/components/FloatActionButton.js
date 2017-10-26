import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StyleSheet } from 'react-native';
import { Constants, Style, Colors } from '../configs';
import { platform } from '../helper';
import { Icon, View } from './';
import { Icons } from '../assets';
class FloatActionButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            heightKeyBoard: 0
        };
    }

    componentWillMount() {
        const updateListener = !platform ? 'keyboardDidShow' : 'keyboardWillShow';
        const resetListener = !platform ? 'keyboardDidHide' : 'keyboardWillHide';

        this._listeners = [
            Keyboard.addListener(updateListener, this._keyboardDidShow),
            Keyboard.addListener(resetListener, this._keyboardDidHide)
        ];
    }

    render() {
        let { heightKeyBoard } = this.state;
        let { onPress, name } = this.props;
        return (
            <View
                disTouch={false}
                onPress={onPress}
                style={[{
                    bottom: (platform ? heightKeyBoard : 0) + Constants.padVer,
                }, styles.constants]}
            >
                <Icon
                    name={name ? name : Icons.add}
                    color={Colors.white}
                    disable
                    size={Constants.icon * 1.1} />
            </View>
        );
    }

    componentWillUnmount = () => {
        this._listeners.forEach(listener => listener.remove());
    }

    _keyboardDidShow = (event) => {
        const { hasTab } = this.props;
        this.setState({ heightKeyBoard: hasTab ? event.endCoordinates.height - Constants.navBarHeight : event.endCoordinates.height });
    }

    _keyboardDidHide = (event) => {
        this.setState({ heightKeyBoard: 0 });
    }
}

const styles = StyleSheet.create({
    constants: {
        backgroundColor: Colors.access,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: Constants.icon * 1.5,
        height: Constants.icon * 1.5,
        borderRadius: Constants.icon,
        right: Constants.padHor,
        ...Style.shadow
    }
})

FloatActionButton.propTypes = {
    name: PropTypes.string,
    onPress: PropTypes.func
};

FloatActionButton.defaultProps = {
    name: Icons.add
};

export default FloatActionButton;
