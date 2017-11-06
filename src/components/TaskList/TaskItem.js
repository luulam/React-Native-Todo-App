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
    onPress,
    onChangeStar
}) => {
    let { isStar } = item;
    return (
        <View style={styles.containerItem} onPress={onPress} disTouch={false}>
            <Text text={item.name} />
            {isExpand
                ? <Text style={styles.textSub}
                    text={item.timeCreate}
                    color={Colors.border}
                    fontSize={Constants.font.sub} />
                : null}
            {isExpand
                ? <View style={styles.containerEdit}>
                    <Icon
                        name={isStar ? Icons.starSelect : Icons.star}
                        color={isStar ? Colors.yellow : undefined}
                        size={Constants.font.icon / 2}
                        onPress={onChangeStar}
                    />
                    <Icon name={Icons.edit} size={Constants.font.icon / 2} />
                </View>
                : null}
            {isExpand
                ? <View style={styles.containerExpand}>
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
        flex: 1,
        borderColor: Colors.border,
        borderBottomWidth: 0.5,
        paddingLeft: Constants.padHor,
        paddingVertical: Constants.padVer,
    },
    containerExpand: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerEdit: {
        flexDirection: 'row',
        position: 'absolute',
        right: Constants.padHor,
        top: Constants.padVer,
    },
    textSub: {
        marginBottom: Constants.padHor
    }
});

export default TaskItem;
