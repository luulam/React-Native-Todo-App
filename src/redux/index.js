import { combineReducers } from 'redux';

import app, * as App from './AppRedux';
import category, * as Category from './CategoryRedux';
import task, * as Task from './TaskRedux'

export {
    App,
    Category,
    Task
};

export default combineReducers({
    app,
    category,
    task
});
