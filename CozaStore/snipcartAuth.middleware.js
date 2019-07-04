const HTTPStatus = require('http-status');
const axios = require('axios');
const SqlProvider = require('./sql.provider');

const authMiddleware = async function (req, res, next) {
    if (!req.headers['snipcart-token']) {
        return res.status(HTTPStatus.FORBIDDEN).end();
    }
    
   // const admins = ['test@test.com', 'ermira.selmani98@gmail.com'];

   const connection = await SqlProvider.getConnection();
   await connection.query('SELECT userEmail FROM users', function (error, results, fields) {
    try {
        const user =  axios.get('https://app.snipcart.com/api/usersessions/' + req.headers['snipcart-token'], {
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic ODQ4NTUxMDYtMzQ1Ny00MWE3LWExOGQtYThmYjNlMjU3OWQxNjM2ODg5MjU4MTY2NjMyOTM0',
            },
        })

        if(!results.includes(user.data.email)){
            return res.status(HTTPStatus.FORBIDDEN).send().end();
        }
    } catch (err) {
        return res.status(HTTPStatus.FORBIDDEN).send().end();
    }

    next();
    
    }); 
}
module.exports = authMiddleware;