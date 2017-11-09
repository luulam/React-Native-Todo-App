import { TaskDB, CategoryDB } from '../helper';

const FETCH_TASK = 'FETCH_TASK';
const ADD_TASK = 'ADD_TASK';
const EDIT_TASK = 'EDIT_TASK';
const REMOVE_TASK = 'DELETE_TASK';
const UPDATE_SELECT_EDIT_TASK_LIST = 'UPDATE_SELECT_EDIT_TASK_LIST';
const UPDATE_SELECT_EXPAND_TASK_LIST = 'UPDATE_SELECT_EXPAND_TASK_LIST';
const SHOW_ADD_TASK = 'SHOW_ADD_TASK';
const HIDE_ADD_TASK = 'HIDE_ADD_TASK';

import { List } from 'immutable';
import { Category } from './';
export const actions = {
    fetchTask: dispatch => ({ id }) => {
        dispatch({
            type: FETCH_TASK,
            taskItems: TaskDB.getByCategory({ id }).map(value => Object.assign({}, value))
        });
    },
    addTask: dispatch => ({ name, idCategory }) => {
        let taskNew = TaskDB.create({ name, idCategory });
        if (idCategory !== undefined) {
            if (CategoryDB.getByID(idCategory) !== undefined) {
                CategoryDB.addTask({ id: idCategory, task: taskNew });
            }
        }
        dispatch({
            type: ADD_TASK,
            taskItem: Object.assign({}, taskNew)
        });
        //update list category in screen ListCategoryScreen
        Category.actions.fetchCategory(dispatch)();
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
    },
    showAddTask: dispatch => ({ idCategory }) => {
        dispatch({
            type: SHOW_ADD_TASK,
            idCategory: idCategory
        });
    },
    hideAddTask: dispatch => ({ value, idCategory }) => {
        dispatch({
            type: HIDE_ADD_TASK,
            idCategory: idCategory,
            valueAddTask: value
        });
    }
};

const INITIAL = {
    listTask: [],
    selectEdit: undefined,
    selectExpand: undefined,

    addTaskShow: false,
    addTaskIdCategory: undefined,
    addTaskValue: undefined
};

export default (state = INITIAL, action) => {
    const { taskItems, taskItem, id, valueSelectEdit, valueSelectExpand, idCategory, valueAddTask } = action;
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

        case SHOW_ADD_TASK: {
            return Object.assign({}, state, {
                addTaskShow: true,
                addTaskIdCategory: idCategory
            });
        }

        case HIDE_ADD_TASK: {
            return Object.assign({}, state, {
                addTaskShow: false,
                addTaskIdCategory: idCategory,
                addTaskValue: valueAddTask
            });
        }
        default:
            return state;
    }
};
