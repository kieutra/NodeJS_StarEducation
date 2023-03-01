
module.exports = {
  //handle array
  multipleMongooseToObject: function (mongooseArray) {
    return mongooseArray.map(mongoose => mongoose.toObject());
  },
  //handle 1 object
  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  }
};