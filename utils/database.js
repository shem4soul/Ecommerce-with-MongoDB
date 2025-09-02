const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;


const mongoConnect = callback => {
    MongoClient.connect(
      "mongodb+srv://smartresearchers82:church@nodejsexpressprojects.caj9s.mongodb.net/?retryWrites=true&w=majority&appName=NodejsExpressProjects"
    )
      .then((result) => {
        console.log("Connected");
      })
      .catch((err) => {
        console.log(err);
      });

}

module.exports = mongoConnect;