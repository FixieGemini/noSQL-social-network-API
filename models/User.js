const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, unique: true, required: true, trimmed: true },
        email: { type: String, unique: true, required: true, match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid e-mail address'] },
        thoughts: [ { type: Schema.Types.ObjectId, ref: "thought" } ],
        friends: [{ type: Schema.Types.ObjectId, ref: "user" } ]
        
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false,
    }
);

userSchema
.virtual('friendCount')
.get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
