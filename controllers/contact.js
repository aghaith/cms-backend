import asyncHandler from 'express-async-handler';
import Contact from '../models/contact.js';

// @desc    add a new contact
// @route   POST /api/v1/contact
// @access  Private
const createContact = asyncHandler(async (req, res) => {
    const { name } = req.body
    const contactExists = await Contact.findOne({ name })
    if (contactExists) {
        res.status(400).send('Contact already exists')
    } else {
        const contact = new Contact({
            name: name,
        });
        const addedContact = await contact.save()
        if (contact) {
            res.status(201).json(addedContact);
            res.status(500).send('Contact successfully created')
        } else {
            res.status(500).send('Contact creation failed')
        }
    }
});

// @desc    Get contacts list
// @route   GET /api/v1/contact
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
    Contact
        .find()
        .exec((err, contacts) => {
            if (err) {
                 res.status(404).json({
                    error: 'Contacts not found'
                })
            }
            res.json(contacts);
        });
});

export {
    createContact,
    getContacts
}
