const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EdgeSchema = new Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Object },
  treeID: { type: String, required: true }, 
});

module.exports = mongoose.model('Edge', EdgeSchema);
