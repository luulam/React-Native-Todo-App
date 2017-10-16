import {combineReducers} from 'redux';

import app from './app';
import nav from './navigation';

export default combineReducers({
    app,
    nav
});
