const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');



const CourseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, maxLength: 600 },
  image: { type: String },
  videoID: { type: String, required: true },
  level: { type: String, maxLength: 255 },
  slug: { type: String, slug: 'name', unique: true },
  // createAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
}, {
  //hiện thời gian khi tạo db
  timestamps: true
});

//Custom query helpers

//Add plugin
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
},);




module.exports = mongoose.model('Course', CourseSchema);