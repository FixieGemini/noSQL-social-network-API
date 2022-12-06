const router =  require ("express").Router()
//const {User} = require ("../../models")

// router.get("/", function (req, res){
// User.find({})
// .then(data => res.json(data))
// })

const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:id
router.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:id/friends/:friendId

router.route('/:id/friends/:friendID')
.post(addFriend)
.delete(deleteFriend)

module.exports = router