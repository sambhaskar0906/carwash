const otpGenerator = require('otp-generator')


const generateOTP = () => {

    const otp = Number(otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, }));
    return otp
}

module.exports = generateOTP;