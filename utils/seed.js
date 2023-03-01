const mongoose = require('mongoose');
const { User, Thought, Reaction } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    thoughts: [],
    friends: []
  }
];

const thoughtData = [
  {
    thoughtText: 'This is a test thought by user1',
    username: 'user1',
    reactions: []
  },
  {
    thoughtText: 'This is another test thought by user2',
    username: 'user2',
    reactions: []
  }
];

const reactionData = [
  {
    reactionBody: 'Awesome thought!',
    username: 'user2',
  },
  {
    reactionBody: 'Great post!',
    username: 'user1',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();

    const users = await User.insertMany(userData);

    const thoughts = await Thought.insertMany(
      thoughtData.map((thought) => ({ ...thought, userId: users.find((user) => user.username === thought.username)._id }))
    );

    await Reaction.insertMany(
      reactionData.map((reaction) => ({ ...reaction, thoughtId: thoughts.find((thought) => thought.username === reaction.username)._id }))
    );

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();