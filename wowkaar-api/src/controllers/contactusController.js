const contactusModel = require('../models/contactUsModel.js')


exports.createContactus = async (req, res) => {
    const { firstname, lastname, address, email, contact, message, messagetitle } = req.body;

    try {
        if (!firstname || !lastname || !address || !email || !contact || !message || !messagetitle) {
            return res.status(400).json({ message: 'All fields are mandatory', status: false, data: null });
        }

        const createContact = await contactusModel.create({
            firstname: firstname,
            lastname: lastname,
            address: address,
            email: email,
            contact: contact,
            message: message,
            messagetitle: messagetitle
        });

        if (!createContact) {
            return res.status(500).json({ message: 'Failed to create contact record', status: false, data: null });
        }

        return res.status(200).json({ message: 'Contact us created successfully', status: true, data: createContact });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', status: false, data: null });
    }
};


exports.getAllContact = async (req, res) => {
    try {
        const getData = await contactusModel.find({});

        if (!getData || getData.length === 0) {
            return res.status(404).json({ message: 'No data exists in contact database', status: false, data: null });
        } else {
            return res.status(200).json({ message: 'All data found successfully', status: true, data: getData });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', status: false, data: null });
    }
}

exports.deleteContact = async (req, res) => {
    const id = req.params.id;
    try {
        const getData = await contactusModel.findById(id);
        if (!getData) {
            return res.status(404).json({ message: 'No data exists in contact database for this id', status: false, data: null });
        }

        const deletedata = await contactusModel.findByIdAndDelete(id);
        if (!deletedata) {
            return res.status(404).json({ message: 'Failed to delete data from contact database for this id', status: false, data: null });
        }

        return res.status(200).json({ message: 'Data deleted successfully', status: true, data: getData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', status: false, data: null });
    }
};

exports.updateContactus = async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, address, contact, message, messageTitle } = req.body;

    try {
        const getData = await contactusModel.findById(id);
        if (!getData) {
            return res.status(404).json({ message: 'No data exists in contact database for this id', status: false, data: null });
        }

        const updatedData = await contactusModel.findByIdAndUpdate(id, {
            firstName, lastName, address, contact, message, messageTitle
        }, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'Failed to update data in the database', status: false, data: null });
        }

        return res.status(200).json({ message: 'Contact data updated successfully', status: true, data: updatedData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', status: false, data: null });
    }
};