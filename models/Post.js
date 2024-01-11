const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    id:{
        type : String,
        require : true
    },
    createdBy:{
        type : String,
        require : true
    },
    title:{
        type : String,
        require : true,
        trim:true
    },
    description:{
        type : String,
        require : true,
        trim:true
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    updatedAt:{
        type : Date,
        default : Date.now
    }

});

module.exports = mongoose.model('Posts',PostSchema);