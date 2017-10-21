import { Configs } from '../configs';

import uuidV4 from 'uuid/v4';

export const ADD_NOTIFY = 'ADD_NOTIFY';
export const REMOVE_NOTIFY = 'REMOVE_NOTIFY';
export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';

let addNotify = (id, title) => ({
    type: ADD_NOTIFY,
    id: id,
    title: title,
});

let hideNotify = id => ({
    type: REMOVE_NOTIFY,
    id: id,
});

export const actions = {
    showNotify: dispatch => (title, timeout) => {
        let id = uuidV4();
        dispatch(addNotify(id, title));
        setTimeout(() => {
            dispatch(hideNotify(id));
        }, timeout ? timeout : Configs.time_show_notify);
    },
    showDialog: dispatch => (title, message, button) => {
        dispatch({
            type: SHOW_DIALOG,
            title,
            message,
            button
        });
    },
    hideDialog: dispatch => {
        dispatch({
            type: HIDE_DIALOG,
        });
    }
};

const INITIAL = {
    notifys: [],
    dialog: {
        title: '',
        message: '',
        button: [],
        show: false
    }
};

export default (state = INITIAL, action) => {
    switch (action.type) {

        case ADD_NOTIFY:
            return Object.assign({}, state, {
                notifys: state.notifys.concat({
                    id: action.id,
                    title: action.title
                })
            });

        case REMOVE_NOTIFY: {
            let indexToast = state.notifys.findIndex(value => value.id === action.id);
            return Object.assign({}, state, {
                notifys: [...state.notifys.slice(0, indexToast), ...state.notifys.slice(indexToast + 1)]
            });
        }

        case SHOW_DIALOG:
            return Object.assign({}, state, {
                dialog: {
                    title: action.title,
                    message: action.message,
                    button: action.button || [],
                    show: true
                }
            });

        case HIDE_DIALOG:
            return Object.assign({}, state, {
                dialog: {
                    title: '',
                    message: '',
                    button: [],
                    show: false
                }
            });

        default:
            return state;
    }
};
