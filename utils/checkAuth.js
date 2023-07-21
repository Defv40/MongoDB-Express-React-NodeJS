import jwt from 'jsonwebtoken';
export default (req, res, next) =>{
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, '');
    console.log(token);
    if (token){
        try {
            const decoded = jwt.verify(token, 'secret');
            req.userId = decoded._id;
        } catch (err) {
            console.log(err);
            return res.status(403).json({
                msg: 'Нет доступа'
            })
        }
    }else{
       
        return res.status(403).json({
            msg: "Нет доступа"
        })
    }
    next();
}