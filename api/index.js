const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User.js')
const bcrypt = require('bcrypt')
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:5173'
}));

console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    const userDoc = await User.create({
        name, 
        email, 
        password: bcrypt.hashSync(password, bcryptSalt)
    })

    res.json(userDoc);
})



app.listen(4000);