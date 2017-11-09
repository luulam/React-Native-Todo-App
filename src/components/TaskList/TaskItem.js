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
    onEdit
}) => {
    let { isStar } = item;
    return (
        <View
            style={styles.containerItem}
            onPress={onPress}
            disTouch={isEditMode}
            disable={isEditMode && !isEdit}>

            <View style={{ flexDirection: 'row' }}>
                {isEditMode && isEdit
                    ? <InputText
                        ref={component => { this[`input${index}`] = component; }}
                        autoFocus
                        maxLength={Configs.maxLengthNameTask}
                        multiline
                        defaultValue={item.name}
                        onUnFocus={() => onUnFocus({ item, index, text: this[`input${index}`].text() })} />
                    : <Text text={item.name} style={{ flex: 1 }} />
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
                ? <Text style={styles.textSub}
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
    containerExpand: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    containerEdit: {
        flexDirection: 'row',
        paddingLeft: Constants.padVer / 2,
    },
    textSub: {
        flex: 1,
        marginBottom: Constants.padHor
    }
});

export default TaskItem;
