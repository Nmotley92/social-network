const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// format the timestamp on retrieval
const dateFormat = (timestamp) => {
  return new Date(timestamp).toISOString();
};

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;
