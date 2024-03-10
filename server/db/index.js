const mongoose =  require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(
    "mongodb+srv://anyarsencarta:4f7rMXBlCrh9Qfs3@cluster0.z1yd29e.mongodb.net/"
    )
    .then(() => console.log('Connected Mongo Db'))
    .catch((e) => console.log(e));