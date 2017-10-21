import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, BackHandler } from 'react-native';
import { Text, Button, View } from '../';
import { Constants, Colors } from '../../configs';
import { Strings } from '../../assets';
import { actions } from '../../redux/AppRedux';

class Dialog extends Component {

    static propTypes = {
        dialog: PropTypes.object,
    }

    static defaultProps = {
        dialog: {
            title: '',
            message: '',
            button: [],
            show: true
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.dialog && nextProps.dialog.show) {
            BackHandler.addEventListener('hardwareBackPressDialog', () => {
                this.props.hideDialog()
            });
        } else {
            BackHandler.addEventListener('hardwareBackPressDialog');
        }
    }

    _renderButton = () => {
        let { dialog } = this.props;
        return (<View style={styles.containersButton}>
            {dialog.button.map((v, i) => <Button
                key={i}
                width={Constants.appWidth / 3}
                title={v.title}
                onPress={v.onPress}
                style={styles.button}
            />)}
        </View>);
    }

    render() {
        let { dialog } = this.props;

        return dialog.show
            ? <View
                disTouch={false}
                activeOpacity={0}
                style={styles.containers}
                onPress={() => this.props.hideDialog()}
            >
                <View
                    disTouch={false}
                    activeOpacity={1}
                    style={styles.containersBackground}>
                    <Text
                        color={Colors.access}
                        text={dialog.title === undefined ? Strings.notification : dialog.title}
                        bold
                        upperCase
                        style={styles.text}
                        fontSize={Constants.font.dialog} />
                    <View style={styles.lineCenter} />
                    <Text
                        text={dialog.message}
                        style={styles.text} />

                    {this._renderButton()}
                </View>
            </View>
            : null;

    }
}

const styles = StyleSheet.create({
    containers: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
    },
    containersBackground: {
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight * 2,
        paddingVertical: Constants.padVer,
        paddingHorizontal: Constants.padHor,
        borderRadius: Constants.borderRadius
    },
    containersButton: {
        marginTop: Constants.padVer,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    lineCenter: {
        marginTop: Constants.padVer,
        marginBottom: Constants.padVer / 2,
        backgroundColor: Colors.access,
        height: 0.5,
        alignSelf: 'stretch'
    },
    text: {
        alignSelf: 'center'
    },
    button: {
        marginLeft: Constants.padHor / 3,
    }
});


const mapStateToProps = (state) => ({
    dialog: state.app.dialog
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    hideDialog: () => actions.hideDialog(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
