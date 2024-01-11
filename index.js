const express = require('express');
const app = express();
const { mongoose  } = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//Routes Middleware
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

//Connect to DB START
async function main(){

    mongoose.connect(process.env.DB_CONNECTION, {
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000, // 45 seconds
    });


}
main().catch(console.error);

//Connect to DB END

app.listen(3001);