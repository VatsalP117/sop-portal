const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: Array,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    },
    students: {
        type: [{
            id:{type:mongoose.Schema.Types.ObjectId,ref:'Student'},
            status: String,
        }]
    },
    status: {
        type: String,
        default: 'pending'
    },
    tags : {
        type: String,
    },
    Date : {
        type: Date,
    },
    gpsrn : {
        type: String,
    }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;