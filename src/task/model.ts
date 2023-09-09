// include external libraries
import mongoose from 'mongoose'


const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        index: true,
    },

    description: {
        type: String,
    },

    accountId: {
        type: String,
        required: true,
        ref: 'Account',
    },
    
    addedOn: {
        type: Date,
        default: Date.now()
    },

}, {
    collation: { locale: 'en_US', strength: 2 }
})


const TaskModel = mongoose.model('Task', taskSchema)

export default TaskModel