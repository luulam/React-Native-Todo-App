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
        return <TaskItem
            index={index}
            item={item}
        />;
    }
    render() {
        const { listTask } = this.props;

        console.log('renderTaskList ', listTask);
        return <View />;
        // return <FlatList
        //     keyboardShouldPersistTaps={'handled'}
        //     data={list}
        //     extraData={this.props}
        //     keyExtractor={(item, index) => index}
        //     renderItem={this.renderItem}
        //     numColumns={2}
        // />;
    }
}

const mapStateToProps = ({ task }) => ({
    listTask: task.listTask
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchTask: (id) => Task.actions.fetchTask(dispatch)({ id }),
    addTask: ({ name, isComplete, isStar, subTask, idCategory }) => Task.actions.addTask(dispatch)({ name, isComplete, isStar, subTask, idCategory }),
    deleteTask: (id) => Task.actions.deleteTask(dispatch)({ id }),
    editTask: ({ id, name, isComplete, isStar, subTask, idCategory }) => Task.actions.editTask(dispatch)({ id, name, isComplete, isStar, subTask, idCategory })
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListCategory);
