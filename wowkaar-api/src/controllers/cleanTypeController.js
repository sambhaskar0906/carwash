const express = require('express')
const cleanTypeModel = require('../models/cleaningType')
const UserModel = require('../models/userModel.js')

//cleaningType
exports.createCleanType = async (req, res) => {
    const userId = req.user.id;

    try {
        const existingCleanType = await cleanTypeModel.findOne({ userId });

        if (existingCleanType) {
            return res.status(200).json({ message: "Please clear all existing data first!", status: false, data: existingCleanType });
        }

        const cleaningType = req.body.cleaningType;
        if (!Array.isArray(cleaningType) || cleaningType.length === 0) {
            return res.status(200).json({ message: "Please provide at least one cleaning type.", status: false });
        }

        const createType = await cleanTypeModel.create({
            userId: req.user.id,
            cleainingType: cleaningType
        });

        if (!createType) {
            return res.status(200).json({ message: "Failed to create type list. Please fill in the information.", status: false });
        }

        res.status(200).json({ message: "Type list created successfully", status: true, data: createType });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", status: false, data: error });
    }
}




exports.updateCleanType = async (req, res) => {
    const id = req.params.id
    // 65c0a746965be0800b003d54
    try {
        if (!id) {
            res.status(300).json({ message: 'Please mention your id', status: false, data: null })

        } else {


            if (!req.body.cleaningType) {
                // console.log("first", !req.body.cleaningType)
                res.status(300).json({ message: 'Please fill the Clean Type data kindly', status: false, data: null })
            }
            else {

                const _id = id
                const findData = await cleanTypeModel.findByIdAndUpdate(_id, {

                    cleainingType: req.body.cleaningType



                });
                const findUpdatedData = await cleanTypeModel.findById(id);
                if (!findUpdatedData) {
                    res.status(300).json({ message: 'No clean type of this id is exist', status: false, data: null })
                } else {
                    res.status(200).json({ message: 'clean type Updated seccessfully', status: true, data: findData })
                }






            }


        }




    } catch (error) {
        res.status(500).json({ message: "some internal error", status: false, data: null })
    }


}


exports.deleteCleanType = async (req, res) => {
    try {
        const userId = req.user.id;
        const findUser = await UserModel.findById(userId);
        if (!findUser) {
            return res.status(200).json({ message: 'User is not authorized', status: false, data: null });
        }

        if (findUser.role !== 2 && findUser.role !== 3) {
            return res.status(200).json({ message: 'User is not authorized to delete the data', status: false, data: null });
        }

        const findData = await cleanTypeModel.findOne({ userId });
        if (!findData) {
            return res.status(200).json({ message: 'No data found to delete', status: false, data: null });
        }

        const deleteResult = await cleanTypeModel.deleteOne({ userId });

        if (deleteResult.deletedCount >= 1) {
            return res.status(200).json({ message: 'Data deleted successfully', status: true, data: deleteResult });
        } else {
            return res.status(200).json({ message: 'Failed to delete data', status: false, data: deleteResult });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', status: false, data: error });
    }
};



exports.getallCleanType = async (req, res) => {
    try {

        const getAllData = await cleanTypeModel.find({})
        if (!getAllData) {
            res.status(200).json({ message: "Data is empty", status: false, data: null })
        } else {
            res.status(200).json({ message: "All data", status: true, data: getAllData })
        }

    } catch (error) {
        res.status(500).json({ message: "some internal error", status: false, data: null })
    }


}