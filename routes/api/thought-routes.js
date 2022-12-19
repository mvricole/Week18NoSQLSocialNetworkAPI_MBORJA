// Constants declare which depencies or technologies we will be using. 
// They also declare methods and require them to be connected to the corresponding document in our controllers. Example, thoughts will require thought-controller. 
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// These routes connect URLS, or in this case documents with related code, to different functions.
// WRT to thoughts, these is how we add functionality to createThought method (POST?) and getSingleThought (GET?) and removeReaction (DELETE)
router.route('/').get(getThoughts).post(createThought);


router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);


router.route('/:thoughtId/reactions').post(addReaction);


router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
