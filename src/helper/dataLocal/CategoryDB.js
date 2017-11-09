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
 * get list Category
 * @returns {RealmObject}
 */
const get = () => {
    return Realm.objects('Category');
};

/**
 * get list Category
 * @returns {RealmObject}
 */
const getByID = (id) => {
    return Realm.objectForPrimaryKey('Category', id);
};

/**
 * create one task
 * @param {string} name
 */
const create = ({
    name
}) => {
    Realm.beginTransaction();
    let id = Realm.create('Category', new List(name)).id;
    Realm.commitTransaction();
    return getByID(id);
};

const edit = ({
    id, name, listTask
}) => {
    Realm.beginTransaction();
    let objectSchema = getByID(id);
    if (name !== undefined) { objectSchema.name = name; }
    if (listTask !== undefined) { objectSchema.listTask = listTask; }
    Realm.commitTransaction();
    return getByID(id);
};

const addTask = ({
    id, task
}) => {
    Realm.beginTransaction();
    let objectSchema = getByID(id);
    if (task !== undefined) {
        objectSchema.listTask.push(task);
    }
    Realm.commitTransaction();
}

/**
 * @param {int} index 
 */
const remove = ({
    id
}) => {
    Realm.beginTransaction();
    Realm.delete(getByID(id));
    Realm.commitTransaction();
    return id;
};

export default {
    get,
    create,
    edit,
    remove,
    getByID,
    addTask
};
