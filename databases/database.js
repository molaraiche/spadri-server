const mongoose = require('mongoose');
const MongoDB_URL = process.envMONGO_URI;
const connectSpadri = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://laraichemohamed:BWsIT47mcjqKq90H@spadri.misunff.mongodb.net/?retryWrites=true&w=majority&appName=spadri'
    );
    console.log('MongoDB has been connected !');
  } catch (error) {
    console.log('There is an error in MongoDB');
    console.log({ error: error.message });
  }
};

module.exports = connectSpadri;
