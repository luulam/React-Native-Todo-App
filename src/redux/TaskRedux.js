import { CategoryDB, TaskDB } from '../helper';

export const FETCH_TASK = 'FETCH_TASK';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const REMOVE_TASK = 'DELETE_TASK';
export const UPDATE_SELECT_EDIT = 'UPDATE_SELECT_EDIT';

import { List } from 'immutable';

export const actions = {
    fetchCategory: dispatch => ({ id }) => {
        dispatch({
            type: FETCH_TASK,
            categoryItems: TaskDB.get()
        });
    },
    addCategory: dispatch => ({ name }) => {
        dispatch({
            type: ADD_TASK,
            category: CategoryDB.create({ name })
        });
    },
    editCategory: dispatch => ({ id, name }) => {
        dispatch({
            type: EDIT_TASK,
            category: CategoryDB.edit({ id, name })
        });
    },
    deleteCategory: dispatch => ({ id }) => {
        dispatch({
            type: REMOVE_TASK,
            id: CategoryDB.remove({ id })
        });
    },
    updateSelectEdit: dispatch => ({ value }) => {
        dispatch({
            type: UPDATE_SELECT_EDIT,
            valueSelectEdit: value
        });
    }
};

const INITIAL = {
    list: [],
    selectEdit: undefined,
    selected: (new Map())
};

export default (state = INITIAL, action) => {
    const { categoryItems, category, id, valueSelectEdit } = action;
    const { list } = state;
    switch (action.type) {

        case FETCH_TASK:
            return Object.assign({}, state, {
                list: categoryItems
            });

        case ADD_TASK:
            let indexADD = list.length - (list[list.length - 1] && list[list.length - 1].isRound ? 2 : 1);

            return Object.assign({}, state, {
                list: checkAddDataRound(List(list).insert(indexADD, Object.assign({}, category))),
                selectEdit: undefined
            });

        case EDIT_TASK: {
            let index = list.findIndex(value => value.id === category.id);

            return Object.assign({}, state, {
                list: List(list).update(index, value => category).toArray(),
                selectEdit: undefined
            });
        }

        case REMOVE_TASK:
            let index = list.findIndex(value => value.id === id);
            if (index === -1) { return state; }
            return Object.assign({}, state, {
                list: checkAddDataRound(List(list).delete(index)),
                selectEdit: undefined
            });

        case UPDATE_SELECT_EDIT:
            return Object.assign({}, state, {
                selectEdit: valueSelectEdit
            });
        default:
            return state;
    }
};
