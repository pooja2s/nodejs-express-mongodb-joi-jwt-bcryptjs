Build A Restful Api With Node.js Express MongoDB Joi and JWT token authentication bcryptjs encryption | Rest Api Tutorial
===============================================================================
This tutorial will guide you on how to build a RESTful API using Node.js, Express framework  Joi and JWT token authentication.

In this tutorial, we will build a RESTful API using the following technologies:
- [Node.js](https://nodejs.org/) as our server platform.
- [Express](http://expressjs.com/) to handle HTTP requests and responses.
- [MongoDB](https://www.mongodb.com/) as our NoSQL database for storing user data.
- [Joi](https://github.com/hapijs/joi) for [validating input](https://github.com/dwyl/learn-rest-api #validate-input).
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken "Auth0's jsonwebtoken library") for generating JSON Web Tokens (JWT),
- [Body-parser middleware](https://github.com/expressjs/body-parser "Body Parser Middleware") to parse JSON and URL encoded form data.

Let's start by installing the required dependencies. Open your terminal or command prompt, navigate to your desired project directory, and run the following commands:

npm init 
npm install express nodemon --save 
npm install mongoose --save 
npm install mongodb --save 
npm install dotenv --save 
npm install body-parser --save 
npm install cors --save


This will add Express, Body-Parser, and Mongoose to your project’s package.json file if it doesn’t already exist. If you are not familiar with npm (the Node Package Manager), I recommend checking out their website at http://npmjs.org/.
# Server Setup
npm start


# Validation Run:
npm i @hapi/joi

# Password encryption Run:
npm i bcryptjs --save


# JWT token Run:
npm i jsonwebtoken --save



Now that all of our dependencies have been installed, let's create an index.js file in our project root directory and require the necessary modules:
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Create a new instance of the express application.
var app = express();

// Tell express where to find static files like CSS and images. In development, these would be served from the /public folder; however, in production they should be served from a CDN.

app.use(express.static(__dirname + '/public'));
// Use the body parser middleware to parse incoming request bodies in a middleware before handlers see the request object. The body parser middleware should be placed before any middleware that needs access to the parsed body.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB. This assumes that there is a MongoDB server running on localhost with default port 27017. You can specify the connection string using MONGOHQ_URL
process.env.MONGOHQ_URL.
mongoose.connect(process.env.MONGOHQ_URL || 'localhost',
function(err) {
    console.log('Connected to MongoDB');
    });

    /*
    * Define a User model. Mongoose allows us to define models which map to collections in MongoDB
    */
    var UserSchema = mongoose.Schema({
        name: String,
        email: { type: String, unique: true },
        password: String
        });
    // On every request to this route (/api/users), the function passed as second argument will be called.
      

This tutorial will guide you to register and login user with JWT token and after login user can add , update and delete this post and can see call the user post as well.


You will find the postman collection to run the API.
To test the API you need to install Postman from https://www.getpostman.com Open the "User Authentication" and then click on import button (top right corner). Then select the file named "userauth.postman_collection.json" .

# Credentials you can use for login:
email : vaibhav@yopmail.com
password : 123456789

# Database collection
The database is created with two table users and posts. You can add more data if needed.


# MongoDB
To connect your node application to MongoDB using mongoose, first install it by running `npm install mongoose --save 
npm install mongodb --save `. Then follow these steps:
- Create ".env" file in root folder.
- Add the following code in your file (.env):
DB_CONNECTION = mongodb+srv://username:password@nodejsapimongo.ppkierw.mongodb.net/
TOKEN_SECRET = dhkanfijvhznfsdjfhsdf







