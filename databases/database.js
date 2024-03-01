const mongoose = require('mongoose');
const MongoDB_URL = process.env.MONGO_URI;
const connectSpadri = async () => {
  try {
    await mongoose.connect(MongoDB_URL);
    console.log('MongoDB has been connected !');
  } catch (error) {
    console.log('There is an error in MongoDB');
    console.log({ error: error.message });
  }
};

module.exports = connectSpadri;
