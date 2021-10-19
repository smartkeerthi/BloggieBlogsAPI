const express = require('express');
const connectDb = require('./db/connectDb');
require('dotenv').config();
const blogs = require('./routes/blogs');
const auths = require('./routes/auths');


// server initializing
const app = express();


// middleware
app.use(express.json());


// routes
app.get('/', (req, res) => {
    res.send("Bloggie Blog Api");
})

app.use('/api/v1/blogs', blogs);

app.use('/api/v1/auth', auths);


const PORT = process.env.port || 5000

const start = async() => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT, console.log(`server running on port ${PORT}...`))
    } catch (error) {
        console.log(err);
    }
}

start();