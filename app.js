const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const database = JSON.parse(fs.readFileSync('database.json'));

app.post('/login', (req, res) => {
    const { pin } = req.body;
    const user = database.users.find(user => user.pin === pin);
    if (user) {
        res.json({ success: true, url: user.url });
    } else {
        res.json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
