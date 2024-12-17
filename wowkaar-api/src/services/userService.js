const User = require('../models/userModel')

exports.getAllUsers = async () => {
    return User.find()
}

exports.getUsersWithFilter = async (filter) => {
    return User.find(filter)
}

exports.getUserById = async (id) => {
    return User.findById(id)
}

exports.createUser = async (user) => {
    const newUser = await User.create(user);
    return newUser;
}

exports.updateUser= async(user)=>{
    const updatedUser = await User.updateOne({email:user.email},user)
    return updatedUser
}