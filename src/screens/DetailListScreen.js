import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Header, Icon, Text, FloatActionButton, TaskList } from '../components';
import { Constants, Colors } from '../configs';
import { Icons } from '../assets';
import { Task } from '../redux';

class DetailList extends Component {
    renderHeader = () => {
        const { params, navigation } = this.props;

        const left = <Icon
            size={Constants.font.h2}
            name={Icons.all}
            onPress={() => navigation.goBack()} />;

        const center = <Text align={'center'}
            ellipsizeMode={'tail'}
            numberOfLines={1}
            text={params.name}
            fontSize={Constants.font.dialog}
            color={Colors.access}
        />;

        const right = <Icon
            size={Constants.font.h2}
            name={Icons.more} />;

        return <Header
            left={left}
            center={center}
            right={right}
        />;
    }

    componentWillReceiveProps(nextProps) {
        const { addTask } = this.props;
        const { addTaskShow, addTaskValue, addTaskIdCategory } = nextProps;
        if (!addTaskShow) {
            if (addTaskValue !== undefined && addTaskIdCategory !== undefined) {
                addTask(addTaskValue, addTaskIdCategory);
            }
        }
    }
    render() {
        const { params } = this.props;
        return (
            <View
                style={styles.containers}
            >
                {this.renderHeader()}
                <TaskList idCategory={params.id} />
                <FloatActionButton onPress={() => this.onShowAddTask()} />
            </View>
        );
    }

    onShowAddTask = () => {
        const { showAddTask, params } = this.props;
        showAddTask(params.id);
    }
}

const styles = StyleSheet.create({
    containers: {
        paddingTop: Constants.statusBarHeight,
        flex: 1
    }
});

const mapStateToProps = ({ task }) => ({
    addTaskShow: task.addTaskShow,
    addTaskIdCategory: task.addTaskIdCategory,
    addTaskValue: task.addTaskValue
});

const mapDispatchToProps = (dispatch) => ({
    showAddTask: (idCategory) => Task.actions.showAddTask(dispatch)({ idCategory }),
    addTask: (name, idCategory) => Task.actions.addTask(dispatch)({ name, idCategory })
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
    Object.assign({}, ownProps, dispatchProps, stateProps, {
        ...ownProps.navigation.state.params
    });

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailList);
