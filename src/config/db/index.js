const mongoose = require('mongoose');
async function connect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect("mongodb://127.0.0.1:27017/f8_education_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("success MG!!!!!!!!");

  } catch (error) {
    console.log("fail MG############");

  }
}

module.exports = { connect };