const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    email: { type: String, required: true },
    address: {
        locality: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: Number, required: true }
    },
    password: { type: String, required: true },
    cpassword: String, // Assuming not required
    mobileNumber: { type: Number, required: true },
    altNumber: { type: Number }, // Assuming not required
    status: { type: Number, default: 1, require: true },
    role: { type: Number, default: 1, require: true },
    description: String, // Assuming not required
    profileImage: String // Assuming not required
},
    { timestamps: true }

);

const User = mongoose.model('User', userSchema)


module.exports = User;
