import { Platform } from 'react-native';
import UserDB from './dataLocal/UserDB';
import CategoryDB from './dataLocal/CategoryDB';
import TaskDB from './dataLocal/TaskDB';

/**
 * platfrom is ios return true, android return false
 * @returns {bool} 
 */
const platform = Platform.OS === 'ios' ? true : false;


/**
 * @returns {bool} 
 */
const isUrl = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}
export { platform, isUrl, UserDB, CategoryDB, TaskDB };
