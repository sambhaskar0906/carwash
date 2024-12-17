const express = require('express')
const servicePlanModel = require('../models/servicePlanModel')

exports.createServicePlan = async (req, res) => {

    const { ServiceType, Amount, cardcontent } = req.body

    try {
        if (!ServiceType || !Amount || !cardcontent) {
            res.status(300).json({ message: 'All fields are mandatory', status: false, data: null })
        }
        else {
            const createdData = await servicePlanModel.create({
                userId: req.user.id,
                ServiceType: ServiceType,
                Amount: Amount,
                cardcontent: cardcontent
            })

            if (!createdData) {
                res.status(300).json({ message: 'Service Plan is not created', status: false, data: null })

            } else {
                res.status(300).json({ message: 'Service Plan created successfully', status: true, data: createdData })
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Some internal error', status: true, data: createdData })
    }
}


exports.getallServicePlan = async (req, res) => {
    try {

        const getAllData = await servicePlanModel.find({})
        if (!getAllData) {
            res.status(300).json({ message: "Data is empty", status: false, data: null })
        } else {
            res.status(200).json({ message: "All data", status: true, data: getAllData })
        }

    } catch (error) {
        res.status(500).json({ message: "some internal error", status: false, data: null })
    }


}


exports.findservicePlanById = async (req, res) => {
    const id = req.params.id

    try {

        if (!id) {
            res.status(300).json({ message: 'All fields are mandatory', status: false, data: null })
        } else {

            const findData = await servicePlanModel.findById(id);
            if (!findData) {
                res.status(300).json({ message: 'No service request is exist', status: false, data: null })
            } else {
                res.status(200).json({ message: 'user find seccessfully', status: true, data: findData })
            }

        }

    } catch (error) {
        res.status(500).json({ message: "some internal error", status: false, data: null })
    }


}



exports.updateServicePlan = async (req, res) => {
    const id = req.params.id
    const { ServiceType, Amount, cardcontent } = req.body

    try {
        if (!ServiceType || !Amount || !cardcontent) {
            res.status(300).json({ message: 'All fields are mandatory', status: false, data: null })
        }
        else {



            if (!id) {
                res.status(300).json({ message: 'Please mention your id', status: false, data: null })
            } else {
                const _id = id
                const findData = await servicePlanModel.findByIdAndUpdate(_id, {

                    ServiceType: ServiceType,
                    Amount: Amount,
                    cardcontent: cardcontent,


                });
                const findUpdatedData = await servicePlanModel.findById(id);
                if (!findUpdatedData) {
                    res.status(300).json({ message: 'No service request is exist', status: false, data: null })
                } else {
                    res.status(200).json({ message: 'user Updated seccessfully', status: true, data: findData })
                }

            }

        }

    } catch (error) {
        res.status(500).json({ message: "some internal error", status: false, data: null })
    }


}




exports.deleteServicePlan = async (req, res) => {
    const id = req.params.id

    try {

        if (!id) {
            res.status(300).json({ message: 'All fields are mandatory', status: false, data: null })
        } else {
            const findData = await servicePlanModel.findById(id);
            if (!findData) {
                res.status(300).json({ message: 'No service request exist', status: false, data: null })
            }
            else {
                const deletedData = await servicePlanModel.deleteOne({ _id: id })
                if (!deletedData) {
                    res.status(300).json({ message: 'No service request is exist', status: false, data: null })
                } else {
                    res.status(200).json({ message: 'user Deleted seccessfully', status: true, data: deletedData })
                }
            }



        }

    } catch (error) {
        res.status(500).json({ message: "some internal error", status: false, data: error })

    }
}