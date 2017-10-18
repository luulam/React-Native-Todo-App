import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import { Text, Icon, View, InputText } from './';
import { colors, constants } from '../configs';
import { icon } from '../assets';


class MyListCategory extends Component {
    state = {
        selected: (new Map()),
        select: 1
    };

    _keyExtractor = (item, index) => index;

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
                <InputText
                    autoFocus
                    defaultValue={name}
                    bold
                    upperCase
                    color={colors.access}
                    onUnFocus={() => this.setState({ select: undefined })} />
                <Icon style={styles.buttonRemove} name={icon.remove} />
            </View >
        );
    }

    _renderItem = ({ item, index }) => {
        const { select } = this.state;
        const { name, numberItem, round } = item;
        let selectEdit = select !== undefined && select === index;

        if (selectEdit) { return this._renderItemEdit({ item, index, selectEdit, round, name, numberItem, select }); }
        return this._renderItemNomal({ item, index, selectEdit, round, name, numberItem, select });
    };

    _onPressItem = ({ item, index }) => {

    }

    _onLongPressItem = ({ item, index }) => {
        this.setState({ select: index });
    }
    render() {
        const { data } = this.props;
        let sourceData = [{ name: 'ALL', numberItem: 10 }].concat(data).concat({});
        sourceData = sourceData.length % 2 === 0 ? sourceData : sourceData.concat({ round: true });
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={sourceData}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    numColumns={2}
                />
            </View>
        );
    }
}

MyListCategory.propTypes = {
    data: PropTypes.any,
    onOpenTask: PropTypes.func
};
MyListCategory.defaultProps = {
    data: [{ name: 'aaa', numberItem: 10 }, { name: 'aaa', numberItem: 0 }, { name: 'aaa', numberItem: 10 }],
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
        right: 0
    }
});

export default MyListCategory;
