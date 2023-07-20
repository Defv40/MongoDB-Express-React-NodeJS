import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js';
import bcrypt from 'bcrypt';
const username = 'admin';
const password = 'pSOI234-zxcl';

const uriMongoDb = `mongodb+srv://${username}:${password}@cluster0.owdqzt6.mongodb.net/blog?retryWrites=true&w=majority`;

mongoose.connect(uriMongoDb).then(() =>{
    console.log("connect to db");
}).catch((err) => console.log(err.message));

const app = express();

app.use(express.json()); // учим читать json

app.get('/', (req, res) =>{
    res.send('index')
});

app.post('/user/login', registerValidation, (req, res) =>{
    res.send('Login');
})

app.post('/auth/register', registerValidation,  async (req, res) =>{
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userDocument = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: hashedPassword
    })

    const user = await userDocument.save();
    const secretKey = 'secret';
    const token = await jwt.sign({
        _id: user._id
    }, secretKey, {expiresIn: '30d'})

    res.json({
        ...user,
        token
    });
   } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        })
   }
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