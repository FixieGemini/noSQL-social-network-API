const { User } = require('../models');

const userController = {

    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
        },

    // Get a single user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
        },

    // Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
        },
    
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : Application.deleteMany({ _id: { $in: user.applications } })
        )
            .then(() => res.json({ message: 'User deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    // Add and update friends
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.id},
            {$push: {friends: params.friendID}},
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
    deleteFriend({params}, res) {

    }
}



// Export userController
module.exports = userController;
