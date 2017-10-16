/**
 * @dateCreate: moment('LLL')
 * 
 */
import { realm } from '../../configs';

class User {
    constructor(lastName, firstName, language, email, accessToken) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.language = language;
        this.email = email;
        this.accessToken = accessToken;
    }
}

const get = () => {
    return realm.objects('User');
};

const create = ({ lastName, firstName, language = 'en', email = '', accessToken = '' }) => {
    if (get().length === 0) {
        realm.beginTransaction();
        realm.create('User', new User(lastName, firstName, language, email, accessToken));
        realm.commitTransaction();
    } else {
        realm.beginTransaction();
        get()[0].lastName = lastName;
        get()[0].firstName = firstName;
        get()[0].language = language;
        get()[0].email = email;
        get()[0].accessToken = accessToken;
        realm.commitTransaction();
    }
};

export default {
    get,
    create
};
