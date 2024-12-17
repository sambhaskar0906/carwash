const config = require('../../config')
const asynHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


// const validateToken = asynHandler(async (req, res, next) => {

//     let token;
//     // let authHeader = req.headers[Authorization] || req.header.authorization
//     // let authHeader = req.headers[Authorization] || req.header.authorization

//     token = req.headers && req.headers["authorization"].split(" ")[1]


//     if (token) {

//         // token=authHeader.split(" ")[1];
//         jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 res.status(401).json({ message: "user is not autherised", status: false, data: null });
//                 console.log(err);
//             } else {
//                 // console.log(decoded);
//                 req.user = decoded.user;
//                 // res.status(200).json({message:decoded});
//                 next();

//             }
//         });


//     }
//     else {
//         res.status(400).json({ message: "authorization is not valid", status: false, data: null })
//     }
// })

// module.exports = validateToken;

const validateToken = asynHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Authorization header is missing or invalid', status: false, data: null });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err.message);
        return res
            .status(401)
            .json({ message: 'Token is not valid', status: false, data: null });
    }
});

module.exports = validateToken;