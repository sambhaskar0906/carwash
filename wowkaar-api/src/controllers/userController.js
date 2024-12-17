const User = require('../models/userModel')
const userService = require('../services/userService')
const { response, errors } = require('../utils/constants')
const generateOtp = require('./Otpgenerator')
const config = require('../../config.js')
const transporter = require("../../CONFIG/emailConfig.js")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const ActiveUser = require("../models/activeUserModel.js")

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers()

        users.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })



        res.status(200).json({ message: 'Userdata fetched successfully', status: true, data: users })

    } catch (e) {
        res.status(500).json({ message: 'Some internal error', status: false, data: null })

    }
}

// just for testing filter
exports.getUserWithFilter = async (req, res) => {
    try {
        console.log(req.body)
        const user = await userService.getUsersWithFilter(req.body)
        res.json(response.success(user))
    } catch (e) {
        res.status(500).json({ error: "Internal server error: " + e, Status: false })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id)
        res.json(user)
    } catch (e) {
        res.status(500).json({ error: "Internal server error: " + e, Status: false })
    }
}



let user = {
    name: {
        firstName: null,  // Use userData.name.firstName instead of "abc"
        lastName: null  // Use userData.name.lastName instead of "maurya"
    },
    email: null,
    password: null,
    cpassword: null,
    address: {
        city: null,
        locality: null,
        pincode: null,
        state: null
    },
    role: null,
    altNumber: null,
    description: null,
    mobileNumber: null,


};


let Dotp = null;

let imageUploading = false;
exports.registerUsers = async (req, res) => {
    console.log('imagefile', req.file)
    console.log(req.body)
    console.log("showing role", req.body.role)
    try {


        var pincode1 = parseInt(req.body.pincode)
        var altNumber1 = parseInt(req.body.altNumber)
        var mobileNumber1 = parseInt(req.body.mobileNumber)
        var role1 = parseInt(req.body.role)

        let userData = req?.body;
        console.log("altnumber", req.body)
        console.log("Deep user data", userData);


        if (!userData) {


            res.status(200).send({ message: "all fieilds are mendatory", Status: false });



        }
        else {

            // console.log("deep", userData);

            user = {
                name: {
                    firstName: req.body.firstName,  // Use userData.name.firstName instead of "abc"
                    lastName: req.body.lastName   // Use userData.name.lastName instead of "maurya"
                },
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword,
                address: {
                    city: req.body.city,
                    locality: req.body.locality,
                    pincode: pincode1,
                    state: req.body.state
                },
                role: role1,
                altNumber: altNumber1,
                description: req.body.description,
                mobileNumber: mobileNumber1,

            }


            if (req.file) {
                user.profileImage = req.file.filename;
                imageUploading = true
            } else {
                imageUploading = false
            }

            // console.log("deep user ==============================", user)

            console.log("postmanNew", user)
            if (user.password != user.cpassword) {
                res.status(200).json({ message: 'Both password does not matched', Status: false })
            }
            else {
                email = user.email;


                const useravailable = await User.findOne({ email });
                console.log("useravailable", useravailable)
                if (useravailable) {
                    res.status(200).json({ message: "email already registerd", Status: false, data: useravailable });
                } else {
                    let genotp = generateOtp();
                    Dotp = genotp;

                    let infomail = await transporter.sendMail({
                        from: config.EMAIL_FROM,
                        to: email,
                        subject: "password reset otp",
                        text: `Your otp is : ${genotp} to verify your email`
                    })


                    res.status(200).json({ message: 'OTP sent on mail !  Please verify your email', Status: true, data: true })
                }

            }

        }


    } catch (error) {
        res.status(500).json({ message: 'Please Enter your detali', Status: false })


    }


};

let vrOtp = 0;

exports.veriSingleOtp = async (req, res) => {
    try {

        vrOtp++;

        let { otp } = req.body

        console.log("otp", otp)
        if (otp) {

            console.log("otp", otp, Dotp)
            if (Dotp == otp) {
                const hashPassword = await bcrypt.hash(user.password, 10);
                console.log("hashpassword : ", hashPassword);
                let createdData = null;
                if (imageUploading) {
                    createdData = await User.create({
                        name: {
                            firstName: user.name.firstName,  // Use user.name.firstName instead of "abc"
                            lastName: user.name.lastName   // Use user.name.lastName instead of "maurya"
                        },
                        email: user.email,
                        password: hashPassword,
                        address: {
                            city: user.address.city,
                            locality: user.address.locality,
                            pincode: user.address.pincode,
                            state: user.address.state
                        },
                        role: user.role,
                        altNumber: user.altNumber,
                        description: user.description,
                        mobileNumber: user.mobileNumber,
                        profileImage: user.profileImage,

                    });

                }
                else {
                    createdData = await User.create({
                        name: {
                            firstName: user.name.firstName,  // Use user.name.firstName instead of "abc"
                            lastName: user.name.lastName   // Use user.name.lastName instead of "maurya"
                        },
                        email: user.email,
                        password: hashPassword,
                        address: {
                            city: user.address.city,
                            locality: user.address.locality,
                            pincode: user.address.pincode,
                            state: user.address.state
                        },
                        role: user.role,
                        altNumber: user.altNumber,
                        description: user.description,
                        mobileNumber: user.mobileNumber,
                        profileImage: "not available",

                    });
                }





                console.log("createdata", createdData)

                if (createdData) {
                    res.status(200).json({ message: "User created successfully !", Status: true, data: createdData })
                    Dotp = null;
                } else {
                    res.status(200).json({ message: "User not created ! Please Enter the information correctly", Status: false, data: null })
                }


            } else {
                if (vrOtp >= 4) {
                    vrOtp = null;
                    res.status(200).json({ message: 'Your OTP is crashed ! Please verify your email again', Status: false, data: null })
                } else {
                    res.status(200).json({ message: 'OTP does not matched ! Please Enter Correct OTP', Status: false, data: null })
                }

            }


        } else {
            res.status(200).json({ message: 'Please Enter Your OTP ', Status: false, data: null })
        }



    } catch (error) {
        res.status(200).json({ message: 'Some Internal error', Status: false, data: null })


    }

}


//==============================================================================================================================


exports.updatedUser = async (req, res) => {
    try {


        const { name, email, address, altNumber, mobileNumber } = req.body;

        const pincode1 = parseInt(address.pincode);
        const altNumber1 = parseInt(altNumber);
        const mobileNumber1 = parseInt(mobileNumber);



        const user = {
            name: {
                firstName: name.firstName,
                lastName: name.lastName
            },
            email,
            address: {
                city: address.city,
                locality: address.locality,
                pincode: pincode1,
                state: address.state
            },
            profileImage: req.file.filename,
            altNumber: altNumber1,
            mobileNumber: mobileNumber1,
        };

        const updateData = await User.findByIdAndUpdate(req.user.id, user, { new: true });


        res.status(200).json({ message: 'User updated successfully', data: updateData });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};




exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({ message: "All fields are mandatory", Status: false, data: null });
        }

        const user = await User.findOne({ email });

        if (user.status !== 1) {
            return res.status(200).json({ message: "Account Blocked ! Contact to Admin", Status: false, data: null });

        }
        if (!user) {
            return res.status(200).json({ message: "Email is not registered", Status: false, data: null });

        }

        if (!user || !(await bcrypt.compare(password, user.password)) || user.status !== 1) {
            return res.status(200).json({ message: "Invalid Id or Password !", Status: false, data: null });
        }

        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user._id
            },
        }, config.ACCESS_TOKEN_SECRET, { expiresIn: "200m" });


        return res.status(200).json({ message: 'Login Successfull', Status: true, data: accessToken, email: user.email, role: user.role, details: user });
    } catch (error) {

        if (res.statusCode == 200) {
            return res.status(200).json({ message: "Email is not registerd", Status: false, data: null });
        }
        return res.status(500).json({ message: "INternal server error", Status: false, data: null });
    }
};







exports.makeInactiveStatus = async (req, res) => {
    try {
        const { id } = req.body;


        const user = await User.findById(id);
        let updatedUser; // Initialize outside if-else scope

        if (!user) {
            return res.status(200).json({ message: "User does not exist with this ID", status: false, data: null });
        } else {
            if (user.status === 0) {
                updatedUser = await User.findByIdAndUpdate(id, { status: 1 });
                return res.status(200).json({ message: "User status set to Inactive .", status: true, data: updatedUser });
            } else if (user.status === 1) {
                updatedUser = await User.findByIdAndUpdate(id, { status: 0 });
                return res.status(200).json({ message: "User status set to Active.", status: true, data: updatedUser });
            }
        }



    } catch (error) {
        console.error("Error in makeInactiveStatus:", error);
        return res.status(500).json({ message: "Internal Server Error", status: false, data: null });
    }
};


exports.makePendingStatus = async (req, res) => {
    try {
        const { id } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(200).json({ message: "User does not exist with this ID", status: false, data: null });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { status: -1 });
        if (!updatedUser) {
            return res.status(200).json({ message: "Failed to update user status. Please try again.", status: false, data: null });
        }

        return res.status(200).json({ message: "User status set to pending.", status: true, data: updatedUser });
    } catch (error) {
        console.error("Error in makeInactiveStatus:", error);
        return res.status(500).json({ message: "Internal Server Error", status: false, data: null });
    }
};


exports.logoutUsers = async (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ error: 'Server error' });
        } else {
            res.json({ message: 'Logout successful' });
        }
    });
};


exports.currentUser = async (req, res) => {
    var email = req.user.email
    console.log(email)
    try {
        const getCurrent = await User.findOne({ email })

        if (!getCurrent) {
            res.status(200).json({ message: "User is not Registered", Status: false, data: null })
        }
        else {

            res.status(200).json({ message: 'Current user ', data: getCurrent, Status: true })
        }

    } catch (error) {
        res.status(500).json({ message: 'Some internal error ', data: getCurrent, Status: true })

    }
}

exports.changePassword = async (req, res) => {

    try {
        const { password, cpassword } = req.body;

        if (!password || !cpassword) {
            res.status(200).json({ message: 'All fields are mandatory', Status: false, data: null })
        } else {

            if (password != cpassword) {
                res.status(200).json({ message: "Password and Confirm Password is not matched . Please Enter correct password !", Status: false, data: false })
            } else {
                const newhashPassword = await bcrypt.hash(password, 10);
                console.log(req.user);
                console.log("userid: ", req.user.id);

                try {
                    // const myHeaders = new Headers();
                    const changeinfo = await User.findByIdAndUpdate(req.user.id, { $set: { password: newhashPassword } });
                    console.log("changeinfo : ", changeinfo);

                    res.status(200).json({ message: "password changed succesfully", Status: true, data: changeinfo })

                } catch (error) {
                    res.status(200).json({ message: "User not define Please SignUp !", Status: false, data: null })
                }

            }

        }



    } catch (error) {
        res.status(500).json({ message: 'Some internal error !', Status: false, data: null })
    }


}




exports.DeleteAccount = async (req, res) => {

    const { email, password } = req.body;

    console.log(email, password);
    req.user;
    await User.deleteOne({ email })


    res.status(200).json({ message: "Deleted succesfully" })
}



let virtualOtp = null;
let virtualid;

exports.sendOtpToResetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(200).json({ message: 'Email is required.', Status: false, data: null });
    }

    try {
        const userInfo = await User.findOne({ email });

        if (!userInfo) {
            return res.status(200).json({ message: 'Email is not registered. Please sign up.', Status: false, data: null });
        }

        virtualid = userInfo._id;
        const genOtp = generateOtp();
        virtualOtp = genOtp;

        await transporter.sendMail({
            from: config.EMAIL_FROM,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP is: ${genOtp} to reset your password.`
        });

        return res.status(200).json({ message: 'OTP sent to your email. Please check your inbox.', Status: true, data: null });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.', Status: false, data: null });
    }
};





exports.changePasswordByotp = async (req, res) => {
    try {
        let c = 0; // Initialize counter
        c++;

        const { password, cpassword, otp } = req.body;
        console.log(password, cpassword, otp)
        if (!password || !cpassword || !otp) {
            return res.status(200).json({ message: 'All fields are mandatory', Status: false, data: null });
        }

        if (c >= 4) {
            virtualOtp = null;
            return res.status(200).json({ message: 'Your OTP has expired', Status: false, data: null });
        }

        if (virtualOtp != otp) {
            return res.status(200).json({ message: 'OTP is not matched. Please enter the correct OTP', Status: false, data: null });
        }

        if (password !== cpassword) {
            return res.status(200).json({ message: "Passwords do not match", Status: false, data: null });
        }

        const newhashPassword = await bcrypt.hash(password, 10);
        const update = { password: newhashPassword };
        const options = { new: true };
        const changeinfo = await User.findOneAndUpdate(virtualid, update, options);
        const find = await User.findById(virtualid);
        if (!changeinfo) {
            return res.status(200).json({ message: "User not found", Status: false, data: null });
        }

        return res.status(200).json({ message: "Password changed successfully", Status: true, data: changeinfo });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error', Status: false, data: null });
    }
}


exports.index = (req, res) => {
    res.status(200).json({ message: 'This is index page' })
}

