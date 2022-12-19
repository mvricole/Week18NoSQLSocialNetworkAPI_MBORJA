const { Schema, model } = require('mongoose');

// Schema set up for User. 
// Logic below denotes what will be included in a User string, such as suername, email, thoughts, friends, etc. 
// Certain elements are set as required in order to be valid input on the database. For example, a username must be required. Prevents clutter or unnecessary user input. 
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Mongoose and REGEX logic validates that the user input is formatted like an email address. 
      match: [/.+@.+\..+/, 'Email not found or invalid. Try again.'],
    },
    // User schema also includes related thoughts. Will pull logic from Thought.js to render thought data. 
    // Creates an array ofid values referencing the Thought model  
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // Creates an array of ID values through referencing the User model. 
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Similar to reaction logic on Reaction.js, this virtual and get method renders a user's friend count. 
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
