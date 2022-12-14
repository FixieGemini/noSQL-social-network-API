const router =  require ("express").Router()
//const {Thought} = require ("../../models")

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction

} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts)

router.route('/:userID/').post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


router
  .route('/:thoughtId/reaction')
  .put(addReaction);

router
  .route('/:thoughtId/reaction/:reactionId')
  .delete(deleteReaction);

module.exports = router