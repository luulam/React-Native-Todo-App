import { CategoryDB, TaskDB } from '../helper';
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const REMOVE_CATEGORY = 'DELETE_CATEGORY';
export const UPDATE_SELECT_EDIT = 'UPDATE_SELECT_EDIT';

import { List } from 'immutable';

const checkAddDataRound = (arr) => {
    let list = List(arr);

    return list.size !== 0 && list.get(list.size - 1).isRound
        ? list.size % 2 === 0
            ? list.toArray()
            : list.pop().toArray()
        : list.size % 2 === 0
            ? list.toArray()
            : list.push({ isRound: true }).toArray();
};

export const actions = {
    fetchCategory: dispatch => () => {
        let listCategory = CategoryDB.get().map(value => Object.assign({}, value));
        //Add Category "ALL" beggin of array and "ADD" laster
        listCategory.unshift({ name: 'ALL', isAll: true, listTask: TaskDB.get() });
        listCategory.push({ isAdd: true });
        dispatch({
            type: FETCH_CATEGORY,
            categoryItems: checkAddDataRound(listCategory)
        });
    },
    addCategory: dispatch => ({ name }) => {
        dispatch({
            type: ADD_CATEGORY,
            category: CategoryDB.create({ name })
        });
    },
    editCategory: dispatch => ({ id, name }) => {
        dispatch({
            type: EDIT_CATEGORY,
            category: CategoryDB.edit({ id, name })
        });
    },
    deleteCategory: dispatch => ({ id }) => {
        dispatch({
            type: REMOVE_CATEGORY,
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

        case FETCH_CATEGORY:
            return Object.assign({}, state, {
                list: categoryItems
            });

        case ADD_CATEGORY:
            let indexADD = list.length - (list[list.length - 1] && list[list.length - 1].isRound ? 2 : 1);
            
            return Object.assign({}, state, {
                list: checkAddDataRound(List(list).insert(indexADD, Object.assign({}, category))),
                selectEdit: undefined
            });

        case EDIT_CATEGORY: {
            let index = list.findIndex(value => value.id === category.id);

            return Object.assign({}, state, {
                list: List(list).update(index, value => category).toArray(),
                selectEdit: undefined
            });
        }

        case REMOVE_CATEGORY:
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
