const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = 'YOUR_MONGODB_URI_HERE';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const companySchema = new mongoose.Schema({
  name: String,
  ticker: String,
  esg: {
    environmental: Number,
    social: Number,
    governance: Number,
    total: Number,
  },
  financials: {
    peRatio: Number,
    marketCap: Number,
  },
});

const Company = mongoose.model('Company', companySchema);

// Seed some data if DB is empty
async function seedData() {
  const count = await Company.countDocuments();
  if (count === 0) {
    await Company.insertMany([
      {
        name: "Green Energy Corp",
        ticker: "GEC",
        esg: { environmental: 85, social: 78, governance: 80, total: 81 },
        financials: { peRatio: 22, marketCap: 1500000000 },
      },
      {
        name: "Tech Innovators Ltd",
        ticker: "TIL",
        esg: { environmental: 65, social: 70, governance: 68, total: 67.6 },
        financials: { peRatio: 30, marketCap: 3000000000 },
      }
    ]);
    console.log('Seeded initial company data');
  }
}

seedData();

app.get('/api/companies', async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

app.get('/api/company/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const company = await Company.findOne({ ticker });
  if (company) res.json(company);
  else res.status(404).json({ error: 'Company not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));