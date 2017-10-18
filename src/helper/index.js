import { Platform } from 'react-native';
import userDB from './dataLocal/user';
import listDB from './dataLocal/list';
import taskDB from './dataLocal/task';

/**
 * platfrom is ios return true, android return false
 * @returns {bool} 
 */
const platform = Platform.OS === 'ios' ? true : false;

export { platform, userDB, listDB, taskDB };
