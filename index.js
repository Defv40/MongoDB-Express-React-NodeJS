import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const username = 'admin';
const password = 'pSOI234-zxcl';

const uriMongoDb = `mongodb+srv://${username}:${password}@cluster0.owdqzt6.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uriMongoDb).then(() =>{
    console.log("connect to db");
}).catch((err) => console.log(err.message));

const app = express();

app.use(express.json()); // учим читать json

app.get('/', (req, res) =>{
    res.send('index')
});

app.get('/user/login', (req, res) =>{
    res.send('Login');
})

app.get('/user/register', (req, res) =>{
    res.send('Register');
})

app.post('/auth/login', (req, res) =>{
    const {email, password} = req.body;
    const privateSecretKey = 'asdflsdkfkld';
    const token = jwt.sign({
        email,
        password
    }, privateSecretKey);

    res.json({
        token
    })
})

app.listen(3000, (err) =>{
    if (err){
        return console.log(err)
    }
    console.log('ok');
})