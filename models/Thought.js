const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, validate: [({ length }) => length > 0 && length <= 280, 'Thoughts can only be between 1 and 280 characters long!'] },
        //username: { type: String, required: true },
        reactions: [ reactionSchema ]
        
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false,
    }
);

thoughtSchema
.virtual('reactionCount')
.get(function() {
    return this.reations.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;