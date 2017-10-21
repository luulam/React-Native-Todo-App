/**
 * @dateCreate: moment('LLL')
 * 
 */
import { Realm } from '../../configs';
import uuidV4 from 'uuid/v4';
import moment from 'moment';
class List {
    constructor(name, listTask = []) {
        this.id = uuidV4();
        this.name = name;
        this.listTask = listTask;
        this.timeCreate = moment().toString();
        this.timeUpdate = moment().toString();
    }
}

/**
 * get list task
 * @returns {RealmObject}
 */
const get = () => {
    return Realm.objects('List');
};

/**
 * create one task
 * @param {string} name
 */
const create = ({
    name,
    listTask
}) => {
    if (name === undefined || name === null || name === '') { throw 'name required is not null'; }
    Realm.beginTransaction();
    Realm.create('List', new List(name, listTask));
    Realm.commitTransaction();
};

const edit = ({
    name, id
}) => {
    Realm.beginTransaction();
    var objectSchema = Realm.objectForPrimaryKey('List', id);
    objectSchema.name = name;
    Realm.commitTransaction();
};

/**
 * @param {int} index 
 */
const remove = ({
    id
}) => {
    Realm.beginTransaction();
    Realm.delete(get().filtered(`id = '${id}'`));
    Realm.commitTransaction();
};

export default {
    get,
    create,
    edit,
    remove
};
