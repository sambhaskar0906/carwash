const transporter = require('../../CONFIG/emailConfig.js')
const config = require('../../config.js')


exports.sendmailfromContactUs = async (req, res) => {

    try {
        const { firstname, lastname, contact, email, address, pincode, message } = req.body;
        if (!firstname || !contact || !email || !address || !message) {
            return res.status(400).json({ message: "All Fields are mandatory", status: false });
        }


        const htmlTemplate = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template</title>
                <style>
                   .header{
                    width: 100%;
                    text-align: center;
                    color: blue;
                   }
                   .info{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    color: blue;
                   }
                   .query{
                    width: 100%;
                    text-align: center;
                   }
                   .container{

                    margin: auto;
                    padding: 20px;
                    width: 90%;
                    height: auto;
                    background-color: rgb(235, 228, 228);
                    border-radius: 10px;
                   }
                    table {
        width: 100%;
        border-collapse: collapse;
        color: grey;
    }
    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    th {
        background-color: #f2f2f2;
        color: green;
    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Query from ${firstname}</h2>
                    </div>
                    <table>
                             <thead>
                                 <tr>
                                     <th>Name</th>
                                     <th>Contact</th>
                                     <th>Email</th>
                                     <th>Address</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <tr>
                                     <td>${firstname} ${lastname ? lastname : ''}</td>
                                     <td>${contact}</td>
                                     <td>${email}</td>
                                     <td>
                                         <p><strong>Locality:</strong> ${address.locality ? address.locality : ''}</p>
                                         <p><strong>City:</strong> ${address.city ? address.city : ''}</p>
                                         <p><strong>District:</strong> ${address.district ? address.district : ''}</p>
                                         <p><strong>State:</strong> ${address.state ? address.state : ''}</p>
                                         <p><strong>Pincode:</strong> ${address.pincode ? address.pincode : ''}</p>
                                     </td>
                                 </tr>
                             </tbody>
                    </table>
                    <div class="query">
                        <h3>Query Message:</h3>
                        <p>${message}</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        let infomail = await transporter.sendMail({
            from: config.EMAIL_FROM,
            to: email,
            subject: `This is query from ${firstname}`,
            html: htmlTemplate
        })
        if (!infomail) {
            return res.status(200).json({ message: 'Email not to be send', status: true, data: infomail });

        }
        return res.status(200).json({ message: 'Email sent successfully!', status: true, data: infomail });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', status: false });
    }
};
