// Declaring constants which require mongoose, also connects to our reaction schema. Data pulled from reaction schema will render as a thought and a total of reactions. 
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Thought required. Please leave a thought.',
      minlength: 1,
      maxlength: 150
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Get method to provide user with a timestamp on their thought.
      // get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    // Grabs information from the reactionSchema to render on your thoughts, including reaction count.  
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// thoughtSchema logic below assists in providing the reaction count per thought. 
thoughtSchema.virtual('reactionCount').get(function() {
  // This getters returns the number of reactions
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
