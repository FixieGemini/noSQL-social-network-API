const { User, Thought } = require('../models');

const userController = {
//module.exports = {

    // Get all users
    getUsers(req, res) {
        User.find()
            .then(async(users) => 
            !users
            ? res.status(500).json({ message: 'No users found!'})
            : res.json(users)
        )
    },

    // Get a single user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.Id })
            .then(async (user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID!' })
            : res.json(user))

            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            }
        );
    },

    // Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err)
        );
    },

    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: req.body
            },
            {
                runValidators: true,
                new: true
            }
        ).then((user) => {
            !user 
                ? res.status(404).json({ message: 'No User' })
                : res.json(user)
            }
        )
    },
    
    // Delete a user and associated thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.Id })
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with that ID!' })
                : Thought.deleteMany({ _id: { $in: user.applications } })
            )
            .then((thoughts) => 
            !thoughts
                ? res.status (404).json({ message: 'User deleted, no thoughts found' })
                :res.json({ message: 'User and associated thoughts successfully deleted!' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            }
        );
    },

    // Add and update friends
    addFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$addToSet: {friends: req.body.friendID}},
            {runValidators: true, new: true}
        )
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user found with that ID!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    // Delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.body.friendID }},
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No friend found with that ID!'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};

// Export userController
module.exports = userController;
