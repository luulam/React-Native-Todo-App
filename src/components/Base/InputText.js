import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, StyleSheet, Platform } from 'react-native';
import { colors, constants } from '../../configs';
import { Text, Icon } from '../';

export default class InputText extends Component {

    static propTypes = {
        defaultValue: PropTypes.string,
        hint: PropTypes.string,
        maxLength: PropTypes.number,
        style: PropTypes.any,
        autoFocus: PropTypes.any,
        hintTop: PropTypes.any,
        styleConstant: PropTypes.any,
        hideBottom: PropTypes.bool,
        iconRemove: PropTypes.bool,
        onFocus: PropTypes.func,
        onUnFocus: PropTypes.func,
        onChangeText: PropTypes.func
    }

    static defaultProps = {
        multiline: false,
        iconRemove: false,
        hideBottom: true
    }

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue || '',
            error: undefined,
            height: 20
        };
    }

    _renderHint = () => {
        let { hint, maxLength } = this.props;
        let { value } = this.state;
        return value.length > 0
            ? <View style={styles.containersHint}>
                <Text
                    text={hint}
                    color={colors.access}
                    fontSize={constants.font.sub}
                />
                {maxLength
                    ? <Text
                        color={colors.access}
                        fontSize={constants.font.sub}
                        text={`${value.length}/${maxLength}`} />
                    : null}
            </View>
            : null;
    }

    _renderRemoveAll = () => {
        let { value } = this.state;
        let { iconRemove } = this.props;
        return value.length && iconRemove > 0
            ? <View
                style={[
                    styles.removeAll,
                    { top: this.props.hintTop ? constants.font.sub + constants.padVer : 0 }
                ]}
            >
                <Icon
                    onPress={() => this._handRemoveAllText()}
                    size={constants.font.nomal}
                    name="ios-close-circle-outline"
                />
            </View>
            : null;
    }

    _renderError = () => {
        let { error } = this.state;
        return error
            ? <Text
                size={constants.font.sub}
                color={colors.error}
                text={error} />
            : null;
    }

    render() {
        const {
            hint,
            multiline,
            style,
            autoFocus,
            hintTop,
            styleConstant,
            maxLength,
            hideBottom
        } = this.props;

        const { value, height } = this.state;

        return (
            <View
                style={[styles.containers, hideBottom ? null : styles.borderBottom, styleConstant,]}
            >
                {hintTop ? this._renderHint() : null}
                <TextInput
                    ref={'_input'}
                    inlineImagePadding={0}
                    maxLength={maxLength}
                    autoFocus={autoFocus}
                    placeholder={hint}
                    blurOnSubmit={true}
                    multiline={multiline}
                    underlineColorAndroid="transparent"
                    onChangeText={this._onChangeText}
                    value={value}
                    onFocus={this._onFocus}
                    style={{
                        fontSize: constants.font.nomal,
                        ...style,
                        paddingRight: constants.font.nomal,
                        height: height
                    }}
                    onContentSizeChange={this._onContentSizeChange}
                    onEndEditing={this._onEndEditing}
                />
                {this._renderError()}
                {this._renderRemoveAll()}
            </View>
        );
    }

    _onFocus = () => {
        this.setState({ error: undefined });
        this.props.onFocus && this.props.onFocus();
    }
    _onEndEditing = () => {
        this.props.onUnFocus && this.props.onUnFocus();
    }

    _handRemoveAllText = () => {
        this.setState({ value: '' });
        this.props.onChangeText && this.props.onChangeText('');
    }

    _onContentSizeChange = (event) => {
        let height = event.nativeEvent.contentSize.height;
        let { onContentSizeChange } = this.props;
        if (Platform.OS === 'android') {this.setState({ height });}
        onContentSizeChange && onContentSizeChange(event);
    }

    _onChangeText = (text) => {
        this.setState({ value: text });
        this.props.onChangeText && this.props.onChangeText(text);
    }
    /**
     * {string} @return 'curent text '
     */
    focus = () => {
        this.refs._input.focus();
    }

    text = () => {
        return this.state.value;
    }

    removeText = () => {
        this._handRemoveAllText();
    }

    showError = (error) => {
        this.setState({ error: error });
    }
}

const styles = StyleSheet.create({
    containers: {
        paddingHorizontal: constants.padHor,
        paddingVertical: constants.padVer,
        justifyContent: 'center',
        flex: 1
    },
    borderBottom: {
        borderBottomColor: colors.border,
        borderBottomWidth: constants.border
    },
    containersHint: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    removeAll: {
        position: 'absolute',
        right: constants.padHor,
        bottom: 0,
        justifyContent: 'center'
    }
});
