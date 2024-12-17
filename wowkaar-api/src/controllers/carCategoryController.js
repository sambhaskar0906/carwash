const express = require('express')
const carTypeModel = require('../models/carCategoryModel')
const UserModel = require('../models/userModel.js')


exports.createCarType = async (req, res) => {

    try {
        const findDataCar = await carTypeModel.find({});

        if (findDataCar && findDataCar.length > 0) {
            return res.status(200).json({ message: "Please clear all data first!", status: false, data: findDataCar });
        }

        if (!Array.isArray(req.body.cartype) || req.body.cartype.length === 0) {
            return res.status(200).json({ message: "Please fill in your Car Category type", status: false, data: findDataCar });
        }

        const createType = await carTypeModel.create({
            userId: req.user.id,
            cartype: req.body.cartype
        });

        if (!createType) {
            return res.status(200).json({ message: "Type list not created. Please fill in the information.", status: false, data: createType });
        }

        res.status(200).json({ message: "Type list created successfully", status: true, data: createType });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Some internal error", status: false, data: error });
    }
};





exports.updateCarType = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(200).json({ message: 'Please provide the car type ID', status: false, data: null });
        }

        if (!req.body.cartype) {
            return res.status(200).json({ message: 'Please provide the car type data', status: false, data: null });
        }

        const updatedCarType = await carTypeModel.findByIdAndUpdate(id, { cartype: req.body.cartype }, { new: true });

        if (!updatedCarType) {
            return res.status(200).json({ message: 'Car type not found', status: false, data: null });
        }

        return res.status(200).json({ message: 'Car type updated successfully', status: true, data: updatedCarType });
    } catch (error) {
        console.error("Error updating car type:", error);
        return res.status(500).json({ message: "Internal server error", status: false, data: null });
    }
};


exports.deleteCarType = async (req, res) => {
    try {
        const userId = req.user.id;
        const findUser = await UserModel.findById(userId);
        if (!findUser) {
            return res.status(200).json({ message: 'User is not authorized', status: false, data: null });
        }

        if (findUser.role !== 2 && findUser.role !== 3) {
            return res.status(200).json({ message: 'User is not authorized to delete the data', status: false, data: null });
        }

        const findData = await carTypeModel.findOne({ userId });
        if (!findData) {
            return res.status(200).json({ message: 'No data found to delete', status: false, data: null });
        }

        const deleteResult = await carTypeModel.deleteOne({ userId });

        if (deleteResult.deletedCount >= 1) {
            return res.status(200).json({ message: 'Data deleted successfully', status: true, data: deleteResult });
        } else {
            return res.status(200).json({ message: 'Failed to delete data', status: false, data: deleteResult });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', status: false, data: error });
    }
};


exports.getallCarType = async (req, res) => {
    try {
        const getAllData = await carTypeModel.find({});

        if (getAllData.length === 0) {
            return res.status(200).json({ message: "No data found", status: false, data: null });
        } else {
            return res.status(200).json({ status: true, data: getAllData });
        }
    } catch (error) {
        console.error("Error retrieving car types:", error);
        return res.status(500).json({ message: "Internal server error", status: false, data: null });
    }
};

