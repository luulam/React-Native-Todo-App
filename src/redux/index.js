import { combineReducers } from 'redux';

import app, * as App from './AppRedux';
import category, * as Category from './CategoryRedux';

export {
    App,
    Category
};

export default combineReducers({
    app,
    category
});
