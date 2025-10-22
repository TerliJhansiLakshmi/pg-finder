// seed/seedDB.js
require('dotenv').config();
const mongoose = require('mongoose');

const State = require('../models/State');
const City = require('../models/City');
const PG = require('../models/PG');

const states = [
  'Maharashtra','Karnataka','Tamil Nadu','Uttar Pradesh','West Bengal',
  'Gujarat','Rajasthan','Andhra Pradesh','Punjab','Kerala'
];

const sampleCities = {
  'Maharashtra': ['Mumbai','Pune','Nashik','Aurangabad','Nagpur','Solapur','Thane','Kolhapur','Amravati','Nanded'],
  'Karnataka': ['Bengaluru','Mysore','Mangalore','Hubli','Belgaum','Davangere','Bijapur','Ballari','Shimoga','Tumkur'],
  'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Tirunelveli','Vellore','Erode','Thoothukudi','Nagercoil'],
  'Uttar Pradesh': ['Lucknow','Kanpur','Varanasi','Agra','Meerut','Aligarh','Ghaziabad','Prayagraj','Bareilly','Noida'],
  'West Bengal': ['Kolkata','Howrah','Durgapur','Siliguri','Asansol','Berhampore','Kalyani','Bardhaman','Raiganj','Kharagpur'],
  'Gujarat': ['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar','Junagadh','Gandhinagar','Nadiad','Anand'],
  'Rajasthan': ['Jaipur','Jodhpur','Udaipur','Kota','Bikaner','Ajmer','Alwar','Bhilwara','Sikar','Sawai Madhopur'],
  'Andhra Pradesh': ['Visakhapatnam','Vijayawada','Guntur','Nellore','Kurnool','Tirupati','Anantapur','Kadapa','Kakinada','Rajahmundry'],
  'Punjab': ['Chandigarh','Ludhiana','Amritsar','Jalandhar','Patiala','Bathinda','Mohali','Pathankot','Firozpur','Hoshiarpur'],
  'Kerala': ['Thiruvananthapuram','Kochi','Kozhikode','Thrissur','Kollam','Alappuzha','Kottayam','Kannur','Palakkad','Malappuram']
};

const featureOptions = [
  { wifi: true, ac: true, washingMachine: true },
  { wifi: true, ac: false, washingMachine: true },
  { wifi: false, ac: false, washingMachine: false },
  { wifi: true, ac: true, washingMachine: false }
];

const randomFrom = arr => arr[Math.floor(Math.random()*arr.length)];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to DB for seeding...');
  await State.deleteMany({});
  await City.deleteMany({});
  await PG.deleteMany({});

  for (const st of states) {
    const stateDoc = await State.create({ name: st });
    const cities = sampleCities[st];
    for (const c of cities) {
      const cityDoc = await City.create({ name: c, state: stateDoc._id });
      for (let i=1;i<=12;i++){
        const feat = randomFrom(featureOptions);
        await PG.create({
          name: `${c} PG ${i}`,
          address: `${i*10} ${c} Main Rd, Near Landmark ${i}`,
          city: cityDoc._id,
          state: stateDoc._id,
          ownerName: `Owner ${i}`,
          ownerContact: `+91${Math.floor(9000000000 + Math.random()*99999999)}`,
          gender: randomFrom(['male','female','unisex']),
          rent: Math.floor(5000 + Math.random()*15000),
          wifi: feat.wifi,
          ac: feat.ac,
          washingMachine: feat.washingMachine,
          nearPlaces: ['Bus Stop','Market','Station']
        });
      }
    }
  }
  console.log('Seeding complete');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
