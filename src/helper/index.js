import { Platform } from 'react-native';
import userDB from './dataLocal/user';

/**
 * platfrom is ios return true, android return false
 * @returns {bool} 
 */
const platform = Platform.OS === 'ios' ? true : false;

export { platform, userDB };
