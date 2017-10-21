import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View } from 'react-native';
import { Constants } from '../../configs';
import { platform } from '../../helper';
class KeyboardHandleView extends Component {

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
        let { heightKeyBoard, style } = this.state;
        return (
            <View
                style={[{
                    height: platform ? heightKeyBoard : 0,
                }, style]}
            />
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

KeyboardHandleView.propTypes = {
    hasTab: PropTypes.bool
};

KeyboardHandleView.defaultProps = {
    hasTab: false
};

export default KeyboardHandleView;
