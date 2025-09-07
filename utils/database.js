const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
      "mongodb+srv://smartresearchers82:church@nodejsexpressprojects.caj9s.mongodb.net/shop?retryWrites=true&w=majority&appName=NodejsExpressProjects"
    )
      .then((result) => {
        console.log("Connected");
        _db = client.db();
        callback();
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

}

const getDb = () => {
   if (_db) {
    return _db;
   }
   throw 'No database found!';
}

module.exports = mongoConnect;
module.exports = getDb;