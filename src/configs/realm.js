import Realm from 'realm';


let UserSchema = {
    name: 'User',
    properties: {
        lastName: { type: 'string' },
        firstName: { type: 'string' },
        language: { type: 'string' },
        email: { type: 'string' },
        accessToken: { type: 'string' }
    }
};

export default new Realm({
    // path: Realm.defaultPath,
    // schemaVersion: Realm.schemaVersion(Realm.defaultPath),
    schema: [UserSchema]
});
