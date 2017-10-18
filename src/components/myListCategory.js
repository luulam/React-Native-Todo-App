import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import { Text, Icon, View, InputText } from './';
import { colors, constants } from '../configs';
import { icon } from '../assets';
import { listDB, taskDB } from '../helper';

class MyListCategory extends Component {
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
                                color={colors.access} />,
                            <Text
                                key={'number'}
                                bold
                                upperCase
                                fontSize={constants.font.sub}
                                text={`${numberItem ? numberItem : 'No'} items`}
                                color={colors.gray} />
                        ]
                        : <Icon
                            onPress={() => this._onRemoveItem()}
                            disable
                            name={icon.add}
                            color={colors.access} />
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
                    name={icon.remove}
                    onPress={() => { console.log('remove'); }} />
                <InputText
                    ref={component => { this[`input${index}`] = component; }}
                    autoFocus
                    defaultValue={name}
                    bold
                    upperCase
                    color={colors.access}
                    onUnFocus={() => this._onUnFocus({ item, index, text: this[`input${index}`].text() })} />

            </View >
        );
    }

    _renderItem = ({ item, index }) => {
        const { select } = this.state;
        const { name, round, listTask } = item;
        let selectEdit = select !== undefined && select === index;
        let numberItem = listTask === undefined || listTask.length;

        if (selectEdit) { return this._renderItemEdit({ item, index, selectEdit, round, name, numberItem, select }); }
        return this._renderItemNomal({ item, index, selectEdit, round, name, numberItem, select });
    };

    componentWillMount() {
        //set data reload view , add event change 
        this.setState({ data: this._getUpdateDataToDB() }, () => {
            listDB.get().addListener((puppies, changes) => {
                this.setState({ data: this._getUpdateDataToDB() });
            });
        });
    }

    render() {
        const { data } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <FlatList
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
        listDB.get().removeAllListeners();
    }

    _getUpdateDataToDB = () => {
        //add List 'ALL' first arr and add 'ADD' last arr
        let sourceData = [{ name: 'ALL', listTask: taskDB.get(), all: true }]
            .concat(listDB.get().map(value => Object.assign({}, value)))
            .concat({});

        //add 'Round' if length odd number then add []
        return sourceData.length % 2 === 0 ? sourceData : sourceData.concat({ round: true });
    }

    _keyExtractor = (item, index) => index;

    _onRemoveItem = ({ }) => {

    }
    _onUnFocus = ({ item, index, text }) => {
        if (text === '') {
            this.setState({ select: undefined });
            return;
        }
        if (item.name === undefined) {
            listDB.create({ name: text });
        } else {
            listDB.edit({ id: item.id, name: text });
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
            onOpenTask && onOpenTask({ item, index })
        }

    }

    _onLongPressItem = ({ item, index }) => {
        if (item.all) { return; }
        this.setState({ select: index }, () => {
            console.log('last _onLongPressItem', this.state);
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
        marginLeft: constants.padHor,
        paddingTop: constants.padVer,

        borderColor: colors.border,
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5
    },
    containerItemRight: {
        flex: 1,
        height: 126,
        marginRight: constants.padHor,
        paddingLeft: constants.padHor,
        paddingTop: constants.padVer,

        borderColor: colors.border,
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

export default MyListCategory;
