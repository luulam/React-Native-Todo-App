import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Icon, InputText } from '../components';
import { Constants, Colors, Style, Configs } from '../configs';
import { Icons, Strings } from '../assets';
import { Task } from '../redux';

class AddTaskScreen extends Component {
    inputTextValue = null;
    state = {
        isShowDone: false
    };
    renderHeader = () => {
        const { isShowDone } = this.state;
        return (
            <View style={styles.containerHeader}>
                <Icon onPress={() => this.onCloseAddTask()}
                    name={Icons.close}
                    style={{ marginHorizontal: Constants.padVer }} />
                <InputText
                    ref={component => { this.inputTextValue = component; }}
                    autoFocus
                    maxLength={Configs.maxLengthNameTask}
                    hint={Strings.hint_add_task}
                    onChangeText={this.onChangetText}
                />
                {isShowDone
                    ? <View style={styles.containerIconDone}>
                        <Icon
                            name={Icons.done}
                            color={Colors.white}
                            onPress={() => this.onCreateTask()} />
                    </View>
                    : null}
            </View>
        );
    };

    render() {
        const { addTaskShow } = this.props;
        if (!addTaskShow) { return <View />; }
        return (
            <View
                style={styles.containers}
            >
                {this.renderHeader()}

            </View>
        );
    }

    onCloseAddTask = () => {
        const { hideAddTask } = this.props;
        hideAddTask(undefined, undefined);
    }

    onCreateTask = () => {
        const { hideAddTask, addTaskIdCategory } = this.props;
        hideAddTask(this.inputTextValue.text(), addTaskIdCategory);
    }
    onChangetText = (text) => {
        if (text && text !== '') {
            this.setState({ isShowDone: true });
        } else {
            this.setState({ isShowDone: false });
        }
    }
}

const styles = StyleSheet.create({
    containers: {
        marginTop: Constants.statusBarHeight,
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: 0, top: 0, left: 0, right: 0,
        flex: 1
    },
    containerHeader: {
        height: Constants.navBarHeight,
        alignItems: 'center',
        flexDirection: 'row',
        ...Style.shadow
    },
    containerIconDone: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Constants.font.icon,
        width: Constants.font.icon,
        borderRadius: Constants.font.icon * 0.5,
        backgroundColor: Colors.access,
        marginHorizontal: Constants.padVer
    }
});

const mapStateToProps = ({ task }) => ({
    addTaskShow: task.addTaskShow,
    addTaskIdCategory: task.addTaskIdCategory,
    addTaskValue: task.addTaskValue
});
const mapDispatchToProps = (dispatch) => ({
    hideAddTask: (value, idCategory) => Task.actions.hideAddTask(dispatch)({ value, idCategory }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskScreen);
