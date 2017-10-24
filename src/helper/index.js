import { Platform } from 'react-native';
import UserDB from './dataLocal/UserDB';
import CategoryDB from './dataLocal/CategoryDB';
import TaskDB from './dataLocal/TaskDB';

/**
 * platfrom is ios return true, android return false
 * @returns {bool} 
 */
const platform = Platform.OS === 'ios' ? true : false;

export { platform, UserDB, CategoryDB, TaskDB };
