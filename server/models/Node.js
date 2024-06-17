const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Object, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  status: { type: String, default: 'Not-yet-triggered' },
  treeID: { type: String, required: true },
});

NodeSchema.pre('save', function (next) {
  if (!this.id.includes(this.treeID)) {
    this.id = `${this.treeID}-${this.id}`;
  }
  next();
});

module.exports = mongoose.model('Node', NodeSchema);
