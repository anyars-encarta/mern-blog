require('dotenv').config();
const mongoose =  require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(
    `mongodb+srv://anyarsencarta:${process.env.Mongo_Db_Password}@cluster0.z1yd29e.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log('Connected to my Mongo Db'))
    .catch((e) => console.log(e));