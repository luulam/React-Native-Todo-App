/**
 * @dateCreate: moment('LLL')
 * 
 */
import { Realm } from '../../configs';
import uuidV4 from 'uuid/v4';
import moment from 'moment';

class Task {
    constructor(name, status, subTask) {
        this.id = uuidV4();
        this.name = name;
        this.status = status;
        this.subTask = subTask;
        this.timeCreate = moment().toString();
        this.timeUpdate = moment().toString();
    }
}

/**
 * get list task
 * @returns {RealmObject}
 */
const get = () => {
    return Realm.objects('Task');
};

/**
 * create one task
 * @param {string} name
 * @param {string} status 
 * @param {Arr} subTask 
 */
const create = ({
    name,
    status,
    subTask
}) => {
    Realm.beginTransaction();
    Realm.create('List', new Task(name, status, subTask));
    Realm.commitTransaction();
};

/**
 * @param {int} index 
 */
const remove = ({
    index
}) => {
    Realm.beginTransaction();
    Realm.delete(get().filtered(`id = ${index}`));
    Realm.commitTransaction();
};


export default {
    get,
    create,
    remove
};
