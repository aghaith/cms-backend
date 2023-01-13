import mongoose from 'mongoose';
import { campaignType } from '../enums/campaign.js';

const campaignSchema = mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String,
        enum: campaignType,
        default: campaignType.MARKETING,
    },
    accountId: {
        type: Number
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

// Duplicate the ID field
campaignSchema.virtual('id').get(function(){
    this._id.toHexString();
});

// Ensure virtual fields are serialised
campaignSchema.set('toJSON', {
    virtuals: true
});

const Campaign = mongoose.model('Campaign', campaignSchema)

export default Campaign
