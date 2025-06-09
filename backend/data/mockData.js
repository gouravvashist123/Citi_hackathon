// Mock Users
const users = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    password: 'hashed_password_1',
    sriPreferences: ['Green Tech', 'Social Impact'],
    followedInvestors: [1, 2],
    createdAt: new Date()
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'hashed_password_2',
    sriPreferences: ['Women-led Companies'],
    followedInvestors: [2],
    createdAt: new Date()
  }
];

// Mock Investors
const investors = [
  {
    id: 1,
    name: 'Sarah Green',
    username: 'greenGuru',
    bio: 'ESG investment specialist focusing on clean energy and sustainable tech',
    avatar: '🌱',
    specialties: ['Green Tech', 'Sustainable Energy', 'ESG Focused'],
    followers: 15420,
    totalInvestments: 89,
    isVerified: true
  },
  {
    id: 2,
    name: 'Impact Queen',
    username: 'impactQueen',
    bio: 'Championing women-led startups and social impact investing',
    avatar: '👑',
    specialties: ['Women-led Companies', 'Social Impact'],
    followers: 12800,
    totalInvestments: 67,
    isVerified: true
  }
];

// Mock Posts
const posts = [
  {
    id: 1,
    investorId: 1,
    content: 'Just invested in Tesla - fighting carbon emissions one EV at a time! 🚗⚡',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 45,
    stock: 'TSLA'
  },
  {
    id: 2,
    investorId: 2,
    content: 'Excited to support another women-led startup in clean tech! The future is female 👩‍💼🌱',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 67,
    stock: null
  }
];

module.exports = { users, investors, posts };