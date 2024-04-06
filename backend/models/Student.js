const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    projects:{
        type: [{
            id: {type:mongoose.Schema.Types.ObjectId,ref:'Project'},
            status: String,
        }],
    },
    cgpa: {
        type: String,
    },
    resume: {
        type: String,
    },
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;