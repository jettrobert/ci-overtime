const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreeSchema = new Schema({
  treeID: { type: String, required: true, unique: true },
  treeName: { type: String, required: true },
});

module.exports = mongoose.model('Tree', TreeSchema);
