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

let TaskItem = ({
    index,
    item,
    isExpand,
    isEdit,
    isEditMode,
    onUnFocus,
    onPress,
    onChangeStar,
    onEdit,
    onChangeComplete,
    onRemove
}) => {
    let { isStar, isComplete } = item;
    return (
        <View
            onSwipeRight={(range) => onChangeComplete(true)}
            onSwipeLeft={(range) => onChangeComplete(false)}
            style={styles.containerItem}
            onPress={!isComplete && onPress}
            disTouch={isEditMode}
            disable={isEditMode && !isEdit}>
            <View
                disable={isComplete}
                style={styles.containerItemDefault}>
                {isEditMode && isEdit
                    ? <InputText
                        ref={component => { this[`input${index}`] = component; }}
                        autoFocus
                        maxLength={Configs.maxLengthNameTask}
                        multiline
                        defaultValue={item.name}
                        onUnFocus={() => onUnFocus({ item, index, text: this[`input${index}`].text() })} />
                    : <Text
                        ellipsizeMode={isExpand ? undefined : 'tail'}
                        numberOfLines={isExpand ? undefined : 1}
                        text={item.name}
                        style={{ flex: 1 }} />
                }
                {isExpand
                    ? <View style={styles.containerEdit}>
                        <Icon
                            name={isStar ? Icons.starSelect : Icons.star}
                            color={isStar ? Colors.yellow : undefined}
                            size={Constants.font.icon / 2}
                            onPress={onChangeStar}
                        />
                        <Icon name={Icons.edit} size={Constants.font.icon / 2} onPress={onEdit} />
                    </View>
                    : null}
            </View>

            {isExpand
                ? <Text
                    style={styles.textSub}
                    text={item.timeCreate}
                    color={Colors.border}
                    fontSize={Constants.font.sub} />
                : null}

            {isExpand
                ? <View style={styles.containerExpand} disable={isEdit}>
                    <Icon name={Icons.sub} color={Colors.access} />
                    <Icon name={Icons.move} color={Colors.access} />
                    <Icon name={Icons.noti} color={Colors.access} />
                    <Icon name={Icons.attack} color={Colors.access} />
                    <Icon name={Icons.share} color={Colors.access} />
                </View>
                : null}

            {isComplete
                ? <View style={styles.containerComplete} >
                    <View style={styles.lineComplete} />
                    <Icon style={styles.containerIconClose}
                        size={Constants.font.icon * 0.7}
                        name={Icons.close}
                        onPress={onRemove}
                        color={Colors.white} />
                </View>
                : null}
        </View>
    );
};

let styles = StyleSheet.create({
    containerItem: {
        borderColor: Colors.border,
        borderBottomWidth: 0.5,
        paddingHorizontal: Constants.padHor,
        paddingVertical: Constants.padVer,
    },
    containerItemDefault: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerExpand: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerEdit: {
        flexDirection: 'row',
        paddingLeft: Constants.padVer / 2,
    },
    textSub: {
        flex: 1,
        marginBottom: Constants.padHor
    },
    containerComplete: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Constants.padHor,
        paddingRight: Constants.padHor / 2
    },
    lineComplete: {
        paddingLeft: Constants.padVer / 2,
        flex: 1,
        height: 1,
        backgroundColor: Colors.border
    },
    containerIconClose: {
        marginHorizontal: 6,
        backgroundColor: Colors.border,
        height: Constants.font.icon * 0.6,
        width: Constants.font.icon * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Constants.font.icon / 2
    }
});

export default TaskItem;
