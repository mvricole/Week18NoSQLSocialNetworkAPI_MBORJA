const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Sets up the formatting of the data on the Schema. 
// Requires the reaction to have valid text input, also requires valid username 
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 150
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Get method formats the time stamp on query.
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = reactionSchema;
