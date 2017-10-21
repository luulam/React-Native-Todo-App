import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { Text, Icon, View, InputText } from './';
import { Colors, Constants } from '../configs';
import { Icons, Strings } from '../assets';
import { ListDB, TaskDB } from '../helper';
import { actions } from '../redux/AppRedux';

class MyListCategory extends Component {

    _arrListCategory = null;

    state = {
        selected: (new Map()),
        select: undefined,
        data: []
    };

    _renderItemNomal = ({ item, index, selectEdit, round, name, numberItem, select }) => {
        let disableItem = select !== undefined || select === index;
        return (
            <View
                disable={disableItem}
                onPress={() => this._onPressItem({ item, index })}
                onLongPress={() => this._onLongPressItem({ item, index })}
                delayLongPress={700}
                disTouch={disableItem || round ? round : false}
                style={[
                    index % 2 === 0 ? styles.containerItemLeft : styles.containerItemRight,
                    name === undefined ? styles.containerItemAdd : null
                ]}
            >
                {!round
                    ? name !== undefined
                        ? [
                            <Text
                                key={'name'}
                                bold
                                upperCase
                                text={name}
                                color={Colors.access} />,
                            <Text
                                key={'number'}
                                bold
                                upperCase
                                fontSize={Constants.font.sub}
                                text={`${numberItem ? numberItem : 'No'} items`}
                                color={Colors.gray} />
                        ]
                        : <Icon
                            disable
                            name={Icons.add}
                            color={Colors.access} />
                    : <View />
                }
            </View>
        );
    }

    _renderItemEdit = ({ item, index, selectEdit, round, name, numberItem }) => {
        return (
            <View
                style={[
                    index % 2 === 0 ? styles.containerItemLeft : styles.containerItemRight,
                ]}
            >
                <Icon
                    style={styles.buttonRemove}
                    name={Icons.remove}
                    onPress={() => this._onRemoveItem({ item, index })} />
                <InputText
                    ref={component => { this[`input${index}`] = component; }}
                    autoFocus
                    defaultValue={name}
                    bold
                    upperCase
                    color={Colors.access}
                    onUnFocus={() => this._onUnFocus({ item, index, text: this[`input${index}`].text() })} />

            </View >
        );
    }

    _renderItem = ({ item, index }) => {
        const { select } = this.state;
        const { name, round, listTask } = item;
        let selectEdit = select !== undefined && select === index;
        let numberItem = listTask !== undefined && listTask.length;

        if (selectEdit) { return this._renderItemEdit({ item, index, selectEdit, round, name, numberItem, select }); }
        return this._renderItemNomal({ item, index, selectEdit, round, name, numberItem, select });
    };

    componentWillMount() {
        //set data reload view , add event change 
        this.setState({ data: this._getUpdateDataToDB() }, () => {
            ListDB.get().addListener((puppies, changes) => {
                this.setState({ data: this._getUpdateDataToDB() });
            });
        });
    }

    render() {
        const { data } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    ref={(comp) => { this._arrListCategory = comp; }}
                    data={data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    numColumns={2}
                />
            </View>
        );
    }

    componentWillUnmount() {
        ListDB.get().removeAllListeners();
    }

    _getUpdateDataToDB = () => {
        //add List 'ALL' first arr and add 'ADD' last arr
        let sourceData = [{ name: 'ALL', listTask: TaskDB.get(), all: true }]
            .concat(ListDB.get().map(value => Object.assign({}, value)))
            .concat({});

        //add 'Round' if length odd number then add []
        return sourceData.length % 2 === 0 ? sourceData : sourceData.concat({ round: true });
    }

    _keyExtractor = (item, index) => index;

    _onRemoveItem = ({ item, index }) => {
        this.props.showDialog(undefined, Strings.noti_remove_category, [
            {
                title: Strings.ok, onPress: () => {
                    this.setState({ select: undefined }, () => {
                        ListDB.remove({ id: item.id });
                    });
                    this.props.hideDialog();
                    this.props.showNotify(Strings.remove_success);
                }
            },
            { title: Strings.canner, onPress: () => this.props.hideDialog() }
        ]);
    }

    _onUnFocus = ({ item, index, text }) => {
        if (text === '') {
            this.setState({ select: undefined });
            return;
        }
        if (item.name === undefined) {
            ListDB.create({ name: text });
        } else {
            ListDB.edit({ id: item.id, name: text });
        }
        this.setState({ select: undefined });
    }

    _onPressItem = ({ item, index }) => {
        const { onOpenTask } = this.props;
        if (item.name === undefined) {
            this.setState({ select: index }, () => {
                console.log('last _onLongPressItem', this.state);
            });
        } else {
            onOpenTask && onOpenTask({ item, index });
        }

    }

    _onLongPressItem = ({ item, index }) => {
        if (item.all) { return; }
        this.setState({ select: index }, () => {

        });
    }
}

MyListCategory.propTypes = {
    onOpenTask: PropTypes.func
};
MyListCategory.defaultProps = {
    onOpenTask: undefined
};

let styles = StyleSheet.create({
    containerItemLeft: {
        flex: 1,
        height: 126,
        marginLeft: Constants.padHor,
        paddingTop: Constants.padVer,

        borderColor: Colors.border,
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5
    },
    containerItemRight: {
        flex: 1,
        height: 126,
        marginRight: Constants.padHor,
        paddingLeft: Constants.padHor,
        paddingTop: Constants.padVer,

        borderColor: Colors.border,
        borderBottomWidth: 0.5,
    },
    containerItemAdd: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRemove: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 999999999999999
    }
});

const mapStateToProps = (state) => ({
    dialog: state.app.dialog
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    showNotify: (data) => actions.showNotify(dispatch)(data),
    showDialog: (title, message, button) => actions.showDialog(dispatch)(title, message, button),
    hideDialog: () => actions.hideDialog(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListCategory);
