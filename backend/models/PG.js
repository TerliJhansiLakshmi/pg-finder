const mongoose = require('mongoose');

const PGScheme = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
  ownerName: String,
  ownerContact: String,
  gender: { type: String, enum: ['male','female','unisex'], default: 'unisex' },
  rent: Number,
  wifi: { type: Boolean, default: false },
  ac: { type: Boolean, default: false },
  washingMachine: { type: Boolean, default: false },
  nearPlaces: [String],
  createdAt: { type: Date, default: Date.now }
});

PGScheme.index({ name: 'text', address: 'text', nearPlaces: 'text' });

module.exports = mongoose.model('PG', PGScheme);
