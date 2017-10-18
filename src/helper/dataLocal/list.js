/**
 * @dateCreate: moment('LLL')
 * 
 */
import { realm } from '../../configs';
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
    return realm.objects('List');
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
    realm.beginTransaction();
    realm.create('List', new List(name, listTask));
    realm.commitTransaction();
};

const edit = ({
    name, id
}) => {
    realm.beginTransaction();
    var objectSchema = realm.objectForPrimaryKey('List', id);
    objectSchema.name = name;
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
    edit,
    remove
};
