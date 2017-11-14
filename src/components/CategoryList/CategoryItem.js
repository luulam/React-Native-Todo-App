import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text, View, Icon, InputText } from '../';
import { Colors, Constants, Configs } from '../../configs';
import { Icons } from '../../assets';

/**
 * 
 * @param 
 * @return <View/>
 */

let CategoryItem = ({
    index,
    item,
    isDisable,
    isEditView,
    isRoundView,
    isAddView,
    isAllView,
    onUnFocus,
    onPressItem,
    onLongPressItem,
    onRemoveItem
}) => {
    const { name, listTask } = item;
    if (!isEditView) {
        return (
            <View
                disable={isDisable}
                onPress={() => onPressItem({ item, index })}
                onLongPress={() => onLongPressItem({ item, index })}
                delayLongPress={Configs.longPress}
                disTouch={isDisable || isRoundView}
                style={[
                    index % 2 === 0 ? styles.containerItemLeft : styles.containerItemRight,
                    isAddView ? styles.containerItemAdd : null
                ]}
            >
                {!isRoundView
                    ? !isAddView
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
                                text={`${listTask ? listTask.length : 'No'} items`}
                                color={Colors.gray} />
                        ]
                        : <Icon
                            disable
                            name={Icons.add}
                            color={Colors.access} />
                    : null
                }
            </View>
        );
    }
    return (
        <View
            style={[
                index % 2 === 0 ? styles.containerItemLeft : styles.containerItemRight,
            ]}
        >
            <InputText
                ref={component => { this[`input${index}`] = component; }}
                autoFocus
                defaultValue={name}
                bold
                maxLength={Configs.maxLengthNameCategory}
                multiline
                upperCase
                color={Colors.access}
                onUnFocus={() => onUnFocus({ item, index, text: this[`input${index}`].text() })} />
            {!isAddView ? <Icon
                style={styles.buttonRemove}
                name={Icons.remove}
                onPress={() => onRemoveItem({ item, index })} /> :
                null}
        </View >
    );
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
        right: 0
    }
});

export default CategoryItem;
