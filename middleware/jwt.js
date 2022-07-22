const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_JWT;

function createToken(id){
    const token = jwt.sign({id},secret,{expiresIn: '1h'});
    return token;
}

function validateToken(token){
    const decode = jwt.verify(token, secret);
    return decode;
}

module.exports = {createToken, validateToken};