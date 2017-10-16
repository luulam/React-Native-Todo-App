/**
 * @dateCreate: moment('LLL')
 * 
 */
import { realm } from '../../configs';
import uuidV4 from 'uuid/v4';

class List {
    constructor(name) {
        this.id = uuidV4();
        this.name = name;
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
 */
const create = ({
    name
}) => {
    realm.beginTransaction();
    realm.create('List', new List(name));
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
