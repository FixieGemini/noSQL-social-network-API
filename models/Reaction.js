const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
        reactionBody: { type: String, required: true, validate: [({ length }) => length <= 280, 'Reactions cannot be more than 280 characters long!'] },
        username: { type: String, required: true},
        
    },
    {
        toJSON: {
          virtuals: true
        },
        id: false,
    }
);

module.exports = reactionSchema;