/**
 * @dateCreate: moment('LLL')
 * 
 */
import { Realm } from '../../configs';
import uuidV4 from 'uuid/v4';
import moment from 'moment';

class Task {
    constructor(name, isComplete, isStar, subTask, idCategory) {
        this.id = uuidV4();
        this.idCategory = idCategory;
        this.name = name;
        if (isComplete !== undefined) { this.isComplete = isComplete; }
        if (isStar !== undefined) { this.isStar = isStar; }
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
 * get list task
 * @param {string} id
 * @returns {RealmObject}
 */
const getByID = (id) => {
    return Realm.objectForPrimaryKey('Task', id);
};

/**
 * 
 * @param {*} id 
 * @returns {RealmObject}
 */
const getByCategory = ({ id }) => {
    if (!id) { return get(); }
    return Realm.objects('Task').filtered(`id = ${id}`);
};

/**
 * create one task
 * @param {string} name
 * @param {string} status 
 * @param {Arr} subTask 
 */
const create = ({
    name,
    isComplete,
    isStar,
    subTask,
    idCategory
}) => {
    Realm.beginTransaction();
    let id = Realm.create('Task', new Task(name, isComplete, isStar, subTask, idCategory)).id;
    Realm.commitTransaction();
    return getByID(id);
};

/**
 * 
 * @param {string} id 
 * @param {string} name 
 * @returns {RealmObject}
 */
const edit = ({
    id,
    name,
    isComplete,
    isStar,
    subTask,
    idCategory
}) => {
    if (id !== undefined) { throw 'id not null'; }
    Realm.beginTransaction();
    let objectSchema = getByID(id);
    if (name !== undefined) { objectSchema.name = name; }
    if (isComplete !== undefined) { objectSchema.isComplete = isComplete; }
    if (isStar !== undefined) { objectSchema.isStar = isStar; }
    if (subTask !== undefined) { objectSchema.subTask = subTask; }
    if (idCategory !== undefined) { objectSchema.idCategory = idCategory; }
    Realm.commitTransaction();
    return getByID(id);
};

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
    getByID,
    getByCategory,
    create,
    edit,
    remove
};
