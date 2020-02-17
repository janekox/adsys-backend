const MongoClient = require('mongodb').MongoClient;

const client = MongoClient('mongodb://root:example@localhost:27017/adsys?authSource=admin&readPreference=primary&ssl=false');

client.connect(function (err) {
    if (err) {
        console.error("Exception while connecting to database");
        console.error(err);
        process.exit(2)
    }
    console.log("Connected successfully to server");
    const db = client.db("adsys");
    const ads = db.collection("ads").find({}).toArray((err, data) => {
        data.forEach(ad => {
            console.log(ad);
        });
    });

    client.close();
});
