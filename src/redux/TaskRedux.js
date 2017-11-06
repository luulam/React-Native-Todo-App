import { TaskDB } from '../helper';

const FETCH_TASK = 'FETCH_TASK';
const ADD_TASK = 'ADD_TASK';
const EDIT_TASK = 'EDIT_TASK';
const REMOVE_TASK = 'DELETE_TASK';
const UPDATE_SELECT_EDIT_TASK_LIST = 'UPDATE_SELECT_EDIT_TASK_LIST';
const UPDATE_SELECT_EXPAND_TASK_LIST = 'UPDATE_SELECT_EXPAND_TASK_LIST';

import { List } from 'immutable';

export const actions = {
    fetchTask: dispatch => ({ id }) => {
        dispatch({
            type: FETCH_TASK,
            taskItems: TaskDB.getByCategory({ id }).map(value => Object.assign({}, value))
        });
    },
    addTask: dispatch => ({ name, idCategory }) => {
        dispatch({
            type: ADD_TASK,
            taskItem: Object.assign({}, TaskDB.create({ name, idCategory }))
        });
    },
    editTask: dispatch => ({ id, name, isComplete, isStar, subTask, idCategory }) => {
        dispatch({
            type: EDIT_TASK,
            taskItem: TaskDB.edit({ id, name, isComplete, isStar, subTask, idCategory })
        });
    },
    deleteTask: dispatch => ({ id }) => {
        dispatch({
            type: REMOVE_TASK,
            id: TaskDB.remove({ id })
        });
    },
    updateSelectEdit: dispatch => ({ value }) => {
        dispatch({
            type: UPDATE_SELECT_EDIT_TASK_LIST,
            valueSelectEdit: value
        });
    },
    updateSelectExpand: dispatch => ({ value }) => {
        dispatch({
            type: UPDATE_SELECT_EXPAND_TASK_LIST,
            valueSelectExpand: value
        });
    }
};

const INITIAL = {
    listTask: [],
    selectEdit: undefined,
    selectExpand: undefined,
};

export default (state = INITIAL, action) => {
    const { taskItems, taskItem, id, valueSelectEdit, valueSelectExpand } = action;
    const { listTask } = state;
    switch (action.type) {

        case FETCH_TASK: {
            return Object.assign({}, state, {
                listTask: taskItems,
                selectEdit: undefined,
                selectExpand: undefined,
            });
        }

        case ADD_TASK: {
            return Object.assign({}, state, {
                listTask: List(listTask).push(taskItem).toArray(),
            });
        }

        case EDIT_TASK: {
            let index = listTask.findIndex(value => value.id === taskItem.id);

            return Object.assign({}, state, {
                listTask: List(listTask).update(index, value => taskItem).toArray(),
            });
        }

        case REMOVE_TASK: {
            let index = listTask.findIndex(value => value.id === id);
            if (index === -1) { return state; }
            return Object.assign({}, state, {
                listTask: List(listTask).delete(index).toArray()
            });
        }

        case UPDATE_SELECT_EDIT_TASK_LIST: {
            return Object.assign({}, state, {
                selectEdit: valueSelectEdit
            });
        }

        case UPDATE_SELECT_EXPAND_TASK_LIST: {
            return Object.assign({}, state, {
                selectExpand: valueSelectExpand
            });
        }
        default:
            return state;
    }
};
