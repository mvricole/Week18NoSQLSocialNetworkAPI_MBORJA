const { Thought, User } = require('../models');

// thoughtController allows the user to access all thoughts in the database. 
const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // getSingleThought allows the user to access thoughts by their id.
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        // Logic if statement below checks for a 1:1 id match in the thought database. If no match found, user will be presented with an error. 
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'Bad ID! No thought found.' });
        }
        res.json(dbThoughtData);
      })
      // 500 error tells user there is an unexpected server issue. 
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // createThought allows the user to write a thought out, and hopefully save it into the database to be retrieved as needed later.(Will test in Insomnia) 
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        // Using similar if logic as above, we do the same for finding users by their ID
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this ID!' });
        }
        // If there is not pre-existing thought with the same id, the thought will be made and saved. 
        res.json({ message: 'Your thought has been made!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // updateThought allows the user to update existing thoughts 
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // deleteThought allows the user to find a previous thought and remove them using the findOneAndRemove below. 
  // Using similar logic to the previous functions above such as update and find - deleteThought searchs for a match (!). If no match is found, the user will be prompted with an error message. 
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }

        // In addition to tracking down the thought, logic below allows the user to find a thought but without a matching id. 
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })

      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }
        res.json({ message: 'Thought successfully deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // addReaction allows the user to add a reaction to their thought using findOneAndUpdate. FindOneAndUpdate 
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Alternatively, the user can remove their reaction from a thought using removeReaction. It also uses the findOneAndUpdate to match and narrow down the user's search.
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
