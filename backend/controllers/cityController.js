const City = require('../models/City');

exports.listCities = async (req, res) => {
  try {
    const { state } = req.query;
    const filter = {};
    if (state) filter.state = state;
    const cities = await City.find(filter).sort({ name: 1 });
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
