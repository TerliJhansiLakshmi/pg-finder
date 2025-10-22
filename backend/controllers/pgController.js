// controllers/pgController.js
const PG = require('../models/PG');

exports.listPGs = async (req, res) => {
  try {
    const { state, city, gender, minRent, maxRent, wifi, ac, washingMachine, q, limit, skip } = req.query;
    const filter = {};
    if (state) filter.state = state;
    if (city) filter.city = city;
    if (gender) filter.gender = gender;
    if (minRent) filter.rent = { ...(filter.rent || {}), $gte: Number(minRent) };
    if (maxRent) filter.rent = { ...(filter.rent || {}), $lte: Number(maxRent) };
    if (wifi) filter.wifi = wifi === 'true';
    if (ac) filter.ac = ac === 'true';
    if (washingMachine) filter.washingMachine = washingMachine === 'true';
    if (q) filter.$text = { $search: q };

    const l = Number(limit) || 200;
    const s = Number(skip) || 0;

    const pgs = await PG.find(filter)
      .populate('city state')
      .limit(l)
      .skip(s)
      .lean();

    res.json(pgs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getPG = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id).populate('city state');
    if (!pg) return res.status(404).json({ msg: 'PG not found' });
    res.json(pg);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.contactOwner = async (req, res) => {
  try {
    const { pgId, name, phone, message } = req.body;
    if (!pgId || !name || !phone) return res.status(400).json({ msg: 'Missing fields' });

    const pg = await PG.findById(pgId);
    if (!pg) return res.status(404).json({ msg: 'PG not found' });

    // DEMO: return owner contact. In production send email/SMS or mask contact.
    return res.json({
      ownerName: pg.ownerName,
      ownerContact: pg.ownerContact,
      note: 'In production this would trigger an email/SMS to the owner instead of returning contact directly.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
