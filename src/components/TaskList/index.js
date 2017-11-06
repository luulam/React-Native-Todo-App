import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { Strings } from '../../assets';
import { App, Task } from '../../redux';
import { View } from '../../components';
import TaskItem from './TaskItem';

class MyListCategory extends Component {
    componentWillMount() {
        this.props.fetchTask();

    }
    renderItem = ({ item, index }) => {
        const { selectEdit, selectExpand } = this.props;

        return <TaskItem
            index={index}
            item={item}
            isExpand={selectExpand === index}
            isEdit={selectEdit === index}
            isEditMode={selectEdit !== undefined}
            onChangeStar={() => this.onChangeStar({ item, index })}
            onPress={() => this.onPressItem({ item, index })}
            onEdit={() => this.onEditItem({ item, index })}
            onUnFocus={this.onUnFocus}
        />;
    }
    render() {
        const { listTask } = this.props;
        return <FlatList
            keyboardShouldPersistTaps={'handled'}
            data={listTask}
            extraData={this.props}
            keyExtractor={(item, index) => index}
            renderItem={this.renderItem}
        />;
    }

    onPressItem = ({ item, index }) => {
        let { updateSelectExpand, selectExpand } = this.props;
        let value = selectExpand === undefined ? index : selectExpand === index ? undefined : index;
        updateSelectExpand(value);
    }

    onChangeStar = ({ item, index }) => {
        let { editTask } = this.props;
        editTask({ isStar: !item.isStar, id: item.id });
    }

    onEditItem = ({ item, index }) => {
        const { updateSelectEdit } = this.props;
        updateSelectEdit(index);
    }

    onUnFocus = ({ item, index, text }) => {
        const { editTask, updateSelectEdit } = this.props;
        if (text !== '' && item.name !== text) {
            editTask({ id: item.id, name: text, });
        }
        updateSelectEdit(undefined);
    }
}

const mapStateToProps = ({ task }) => ({
    listTask: task.listTask,
    selectEdit: task.selectEdit,
    selectExpand: task.selectExpand
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchTask: (id) => Task.actions.fetchTask(dispatch)({ id }),
    addTask: ({ name, isComplete, isStar, subTask, idCategory }) => Task.actions.addTask(dispatch)({ name, isComplete, isStar, subTask, idCategory }),
    deleteTask: (id) => Task.actions.deleteTask(dispatch)({ id }),
    editTask: ({ id, name, isComplete, isStar, subTask, idCategory }) => Task.actions.editTask(dispatch)({ id, name, isComplete, isStar, subTask, idCategory }),
    updateSelectEdit: (value) => Task.actions.updateSelectEdit(dispatch)({ value }),
    updateSelectExpand: (value) => Task.actions.updateSelectExpand(dispatch)({ value })


});

export default connect(mapStateToProps, mapDispatchToProps)(MyListCategory);
