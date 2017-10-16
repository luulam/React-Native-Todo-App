/**
 * @dateCreate: moment('LLL')
 * 
 */
import { realm } from '../../configs';
import uuidV4 from 'uuid/v4';

class Task {
    constructor(name, status, subTask) {
        this.id = uuidV4();
        this.name = name;
        this.status = status;
        this.subTask = subTask;
        this.timeCreate = new Date();
        this.timeUpdate = new Date();
    }
}

/**
 * get list task
 * @returns {RealmObject}
 */
const get = () => {
    return realm.objects('List');
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
    realm.beginTransaction();
    realm.create('List', new Task(name, status, subTask));
    realm.commitTransaction();
};

/**
 * @param {int} index 
 */
const remove = ({
    index
}) => {
    realm.delete(get().filtered(`id = ${index}`));
};


export default {
    get,
    create,
    remove
};
