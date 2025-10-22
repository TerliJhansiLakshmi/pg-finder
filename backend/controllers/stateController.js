const State = require('../models/State');

exports.listStates = async (req, res) => {
  try {
    const states = await State.find({}).sort({ name: 1 });
    res.json(states);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
