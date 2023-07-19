import express from 'express';
import jwt from 'jsonwebtoken'
const app = express();

app.use(express.json()); // учим читать json

app.get('/', (req, res) =>{
    res.send('hello user you"re noob');
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