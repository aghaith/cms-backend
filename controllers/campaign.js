import asyncHandler from 'express-async-handler';
import Campaign from '../models/campaign.js';
import Contact from '../models/contact.js';
import { formatKey } from '../middleware/helpers.js';
import mongoose from 'mongoose';

// @desc    add a new campaign
// @route   POST /api/v1/campaign
// @access  Private
const createCampaign = asyncHandler(async (req, res) => {
    const {
        name,
        type,
        accountId,
        contacts
    } = req.body;

    const campaignExists = await Campaign.findOne({ name })
    if (campaignExists) {
        res.status(400).json({
            error: 'Campaign already exists'
        });
    } else {
        const contactsIds = Promise.all(contacts.map(async (contact) => {
            let newContact = new Contact({
                name: contact.label
            })

            newContact = await newContact.save();
            return newContact._id;
        }));

        const contactsIdsResolved = await contactsIds;

        const campaign = new Campaign({
            name: name,
            type: type,
            accountId: accountId,
            contacts: contactsIdsResolved,
            user: req.user.userId
        });

        const addedCampaign = await campaign.save()

        if (addedCampaign) {
            res.status(201).json({
                data: {
                    message: 'Campaign created successfully'
                }
            });
        } else {
            res.status(500).json({
                error: 'Campaign creation failed'
            });
        }
    }
});

// @desc    Get campaigns list
// @route   GET /api/v1/campaign
// @access  Private
const getCampaigns = asyncHandler(async (req, res) => {
    Campaign
        .find()
        .exec((err, campaigns) => {
            if (err) {
                res.status(404).json({
                    error: 'Campaigns not found'
                })
            }
            res.json(campaigns);
        });
});

// @desc    Get campaigns list by key
// @route   GET /api/v1/campaign/related
// @access  Private
const campaignsBySearch = asyncHandler(async (req, res) => {
    let { type, name } = req.query;
    let query = {};
    if (type != null) query.type = type;
    if (name != null) query.name = name;
    Campaign
        .find(query)
        .exec((err, campaigns) => {
            if (err) {
                return res.status(400).json({
                    error: 'Campaigns not found'
                });
            }
            res.json(campaigns);
        })
});

// @desc    Get Campaign
// @route   GET /api/v1/campaign/id
// @access  Private
const campaignById = asyncHandler(async (req, res) => {
    Campaign
        .findById(req.params.id)
        .exec((err, campaign) => {
            if (err) {
                res.status(404).json({
                    data: {
                        message: 'Campaign not found'
                    }
                })
            }
            res.json(campaign);
        });
});

// @desc    Delete Campaign
// @route   DELETE /api/v1/campaign
// @access  Private
const deleteCampaign = asyncHandler(async (req, res) => {
    const campaignId = req.body.selectedIds;
    for (const id of campaignId) {
        await Campaign.findByIdAndDelete(id);
    }
    res.status(201).json({
        data: {
            message: 'Campaigns delete successfully'
        }
    });
});

// @desc    Clone Campaign
// @route   POST /api/v1/campaign/clone
// @access  Private
const cloneCampaign = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    Campaign.findById(_id, function (err, results) {
        var newCampaign = new Campaign(results);
        newCampaign._id = mongoose.Types.ObjectId();
        newCampaign.isNew = true;
        newCampaign.save(function (err) {
            if (err) {
                res.json('Campaign clone failed');
            } else {
                res.json('Campaign successfully cloned');
            }
        });
    });
});

// @desc    Campaigns per month filtered by type
// @route   GET /api/v1/campaign/get/per-month?type=''
// @access  Private
const countCampaignsPerMonth = asyncHandler(async (req, res, next) => {
    let { type } = req.query;
    let query = {};
    if (type != null) query.type = type;
    const campaigns = await Campaign.find(query, '_id').exec();

    const campaignsPerMonth = campaigns.reduce((map, { dateCreated }) => {
        // assuming dateCreated is already a `Date` instance
        const key = formatKey(dateCreated).replace(" ", "-")

        return map.set(key, (map.get(key) ?? 0) + 1)
    }, new Map())

    const asObject = Object.fromEntries(campaignsPerMonth)
    let data;
    for (var property in asObject) {
        data = {
            date: property,
            value: asObject[property]
        }
    }
    // and if you want to respond with JSON
    res.status(200).json([data])
})

export {
    createCampaign,
    getCampaigns,
    campaignsBySearch,
    campaignById,
    deleteCampaign,
    cloneCampaign,
    countCampaignsPerMonth
}
