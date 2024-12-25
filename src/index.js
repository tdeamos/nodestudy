require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Node.js API!');
});

// In-memory users data
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Get All Users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a User by ID
app.get('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Create a New User
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Delete a User by ID
app.delete('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    users = users.filter(user => user.id !== userId);

    res.json({ message: `User with ID ${userId} deleted` });
});


// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error', details: err.message });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});