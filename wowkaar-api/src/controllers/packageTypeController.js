const express = require('express')
const packageTypeModel = require('../models/packageTypeModel')
const UserModel = require('../models/userModel.js')



exports.createPackageType = async (req, res) => {

    try {
        const findDataPackage = await packageTypeModel.find({});

        if (findDataPackage && findDataPackage.length > 0) {
            return res.status(200).json({ message: "Please clear all data first!", status: false, data: null });
        }

        if (!Array.isArray(req.body.packagetype) || req.body.packagetype.length === 0) {
            return res.status(200).json({ message: "Please fill in your package type", status: false, data: null });
        }

        const createType = await packageTypeModel.create({
            userId: req.user.id,
            packagetype: req.body.packagetype
        });

        if (!createType) {
            return res.status(200).json({ message: "Type list not created. Please fill in the information.", status: false, data: null });
        }

        res.status(200).json({ message: "Type list created successfully", status: true, data: createType });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Some internal error", status: false, data: error });
    }
};




exports.updatePackageType = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            res.status(400).json({ message: 'Please mention your id', status: false, data: null });
        } else {
            const firstFindData = await packageTypeModel.findById(id);
            if (!firstFindData) {
                res.status(404).json({ message: 'No type with this id exists', status: false, data: null });
            } else {
                if (!req.body.packagetype) {
                    res.status(400).json({ message: 'Please fill the Package Type data', status: false, data: null });
                } else {
                    const updatedData = await packageTypeModel.findByIdAndUpdate(id, {
                        packagetype: req.body.packagetype
                    });
                    const findUpdatedData = await packageTypeModel.findById(id);
                    if (!findUpdatedData) {
                        res.status(404).json({ message: 'No type with this id exists', status: false, data: null });
                    } else {
                        res.status(200).json({ message: 'Package type updated successfully', status: true, data: findUpdatedData });
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', status: false, data: null });
    }
};


exports.deletePackageType = async (req, res) => {
    try {
        const userId = req.user.id;
        const findUser = await UserModel.findById(userId);

        if (!findUser) {
            return res.status(200).json({ message: 'User is not authorized', status: false, data: null });
        }

        if (findUser.role !== 2 && findUser.role !== 3) {
            return res.status(200).json({ message: 'User is not authorized to delete the data', status: false, data: null });
        }

        const findData = await packageTypeModel.findOne({ userId });

        if (!findData) {
            return res.status(200).json({ message: 'No data found to delete', status: false, data: null });
        }

        const deleteResult = await packageTypeModel.deleteOne({ userId });

        if (deleteResult.deletedCount === 1) {
            return res.status(200).json({ message: 'Data deleted successfully', status: true, data: deleteResult });
        } else {
            return res.status(200).json({ message: 'Failed to delete data', status: false, data: deleteResult });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', status: false, data: error });
    }
};



exports.getallPackageType = async (req, res) => {
    try {
        const getAllData = await packageTypeModel.find({});
        if (getAllData.length === 0) {
            res.status(200).json({ message: "Data is empty", status: false, data: null });
        } else {
            res.status(200).json({ message: "All data", status: true, data: getAllData });
        }
    } catch (error) {
        res.status(500).json({ message: "Some internal error", status: false, data: null });
    }
};