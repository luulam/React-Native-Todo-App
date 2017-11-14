import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Constants, Configs } from '../../configs';
import uuidV4 from 'uuid/v4';
/**
 * 
 * @param 
 * @return <View/>
 */
class ViewApp extends Component {
    _name = 'ViewApp'
    _countdown = undefined
    _timeCountTouch = 0
    _locationX = undefined
    _locationY = undefined

    onHandleTouch = {
        onStartShouldSetResponder: () => !this.props.disTouch,
        onResponderTerminationRequest: (event) => { },
        onResponderGrant: (event) => {
            const { onLongPress, delayLongPress } = this.props;

            this._name.setNativeProps({ opacity: Constants.opacity });

            this._locationX = event.nativeEvent.pageX;
            this._locationY = event.nativeEvent.pageY;

            this._countdown = setInterval(() => {
                if (delayLongPress === this._timeCountTouch) {
                    onLongPress && onLongPress();
                    this._timeCountTouch = 0;
                    clearInterval(this._countdown);
                    this._countdown = undefined;
                }
                this._timeCountTouch = (this._timeCountTouch + 10);
            }, 10);
        },
        onResponderMove: (event) => { },
        onResponderRelease: (event) => {
            const { onPress, onSwipeLeft, onSwipeRight } = this.props;
            const { _locationX, _locationY } = this;
            const handleReset = () => {
                this._timeCountTouch = 0;
                clearInterval(this._countdown);
            };

            this._name.setNativeProps({ opacity: 1 });

            // check swipe
            const { pageX } = event.nativeEvent;

            if (_locationX !== undefined && _locationY !== undefined) {
                console.log(_locationX, pageX, pageX - _locationX);
                if (pageX - _locationX > Configs.ranger_Swipe) {
                    onSwipeRight && onSwipeRight(pageX - _locationX);
                    handleReset();
                    return;
                }
                if (pageX - _locationX < -Configs.ranger_Swipe) {
                    onSwipeLeft && onSwipeLeft(pageX - _locationX);
                    handleReset();
                    return;
                }
            }

            // check press
            if (this._countdown !== undefined && this._timeCountTouch !== undefined) {
                console.log('onPress');
                onPress && onPress();
            }
            handleReset();
        },
        onResponderTerminate: (event) => { }
    }


    render() {
        const { style,
            disable,
            children
         } = this.props;
        return (
            <View
                ref={component => { this._name = component; }}
                {...this.onHandleTouch}
                {...this.props}


                style={[style, { opacity: disable ? 0.2 : 1 }]}
            >
                {children}
            </View>
        );
    }
}

ViewApp.propTypes = {
    disable: PropTypes.bool,
    disTouch: PropTypes.bool
};

ViewApp.defaultProps = {
    disable: false,
    disTouch: true,
    delayLongPress: Configs.longPress
};


export default ViewApp;
