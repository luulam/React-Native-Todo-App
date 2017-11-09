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

let CategorySchema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        listTask: { type: 'list', objectType: 'Task'},
        timeCreate: { type: 'string' },
        timeUpdate: { type: 'string' },
    }
};

let TaskSchema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
        id: { type: 'string' },
        idCategory: { type: 'string' },
        name: { type: 'string' },
        isComplete: { type: 'bool', default: false },
        isStar: { type: 'bool', default: false },
        subListTask: { type: 'list', objectType: 'SubTask' },
        timeCreate: { type: 'string' },
        timeUpdate: { type: 'string' },
    }
};

let SubTaskSchema = {
    name: 'SubTask',
    primaryKey: 'id',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        isComplete: { type: 'bool', default: false },
        timeCreate: { type: 'string' },
        timeUpdate: { type: 'string' },
    }
}

export default new Realm({
    path: 'BangTodo.realm',
    schemaVersion: 0,
    schema: [UserSchema, CategorySchema, TaskSchema, SubTaskSchema]
});
