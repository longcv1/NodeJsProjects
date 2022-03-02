const jwt = require('jsonwebtoken');

const createJwt = ({ payload }) => {
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFE_TIME }
    );
    return token;
}

const isTokenValid = ({ token }) => {
    const temp = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token verified: ",temp);
    return temp;
}


const attachCookiesToRes = ({res, user}) => {
    const token = createJwt({payload:user});
    let oneDay = 1000*3600*24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'prod',
        signed: true,
    })
    return token;
}

module.exports = {
    createJwt,
    isTokenValid,
    attachCookiesToRes,
};