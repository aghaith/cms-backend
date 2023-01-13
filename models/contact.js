import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    name: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
