const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init middleware, extended is not a opcion for .json
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Hello world' }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
