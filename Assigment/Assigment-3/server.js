const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const profile = {
  name: 'Navya Jauhri',
  course: 'B.Tech Computer Science and Engineering',
  year: '1st Year',
  college: 'ABES Engineering College',
  location: 'Ghaziabad, Uttar Pradesh, India',
  email: 'navya.jauhri@gmail.com',
  phone: '+91 98765 43210',
  skills: ['HTML5', 'CSS3', 'JavaScript', 'C++', 'Python', 'Git & GitHub', 'Responsive Web Design', 'Basic Data Structures and Algorithms']
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/profile', (req, res) => {
  res.json(profile);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
