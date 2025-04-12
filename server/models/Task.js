const mongoose = require('mongoose')

//Define Task Schema
const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true, //title is required field
    },
    description:{
        type: String,
    },
    completed:{
        type: Boolean,
        default: false, //Default value for completed tasks is false
    },
    createdAt:{
        type: Date,
        default: Date.now,  //Automatically set the task's creation date  
    }
})

module.exports=mongoose.model('Task',taskSchema)