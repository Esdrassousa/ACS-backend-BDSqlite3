
const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
    var a = await process.env.USER_KEY 
    return jwt.sign(data, a, { expiresIn: '1d' });
    
}

exports.decodeToken = async (token) => {
    var a = await process.env.USER_KEY 
    var data = await jwt.verify(token, a);
    return data;
}

exports.authorize = async function (req, res, next) {
    var a = await process.env.USER_KEY 
    var token = req.body.token || req.query.token || req.headers['access'];

    if (!token) {
        res.status(401).json({ message: 'Acesso Restrito' })
    } else {
        await jwt.verify(token, a , function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Invalido'
                });
            } else {
                next();
            }
        });
    }
}

exports.isAdmin = async function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['access'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        })
    } else {
        var a = await process.env.USER_KEY
        await jwt.verify(token, a, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Invalido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita a administradores'
                    })
                }
            }
        });
    }
}