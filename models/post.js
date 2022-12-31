const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // title: { type: String, required: true },
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
});

PostSchema.virtual('url').get(function () {
  return `/clubhouse/post/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);
