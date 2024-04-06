const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    projects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Project'
    },
});

const Faculty = mongoose.model('Faculty', FacultySchema);

module.exports = Faculty;