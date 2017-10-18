import Realm from 'realm';


let UserSchema = {
    name: 'User',
    properties: {
        lastName: { type: 'string' },
        firstName: { type: 'string' },
        language: { type: 'string' },
        email: { type: 'string' },
        accessToken: { type: 'string' },
        theme: { type: 'string' },
        default: { type: 'string' },
    }
};

let ListSchema = {
    name: 'List',
    primaryKey: 'id',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        listTask: { type: 'list', objectType: 'Task' },
        timeCreate: { type: 'string' },
        timeUpdate: { type: 'string' },
    }
};

let TaskSchema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        status: { type: 'string' },
        subTask: { type: 'data' },
        timeCreate: { type: 'string' },
        timeUpdate: { type: 'string' },
    }
};

export default new Realm({
    // path: Realm.defaultPath,
    // schemaVersion: Realm.schemaVersion(Realm.defaultPath),
    schema: [UserSchema, ListSchema, TaskSchema]
});
