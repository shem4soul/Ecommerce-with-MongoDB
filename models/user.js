const getDb = require('../utils/database').getDb;


class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
        }
        save() {
            const db = getDb();
            return db.collection('users').insertOne(this);
        }
    static findById(userId) {}
}

module.exports = User;