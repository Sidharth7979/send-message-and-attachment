const express = require('express')
const nodemailer = require('nodemailer');
const router = require('./Router/router.js')
const fs = require('fs'); // Node.js file system module
const app = express() // Assuming this is the correct path to your router file
const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "sidhubhai1997@gmail.com",
        pass: "uddo ntxn vnff wcqb",
    },


})
app.set('view engine', 'ejs');
app.get("/",function(req,res){
    res.render('index')

})
app.post("/sendmail",async(req,res)=> {

    try {
        // Read the photo file
        const photo = fs.readFileSync('download.png'); // Replace with the actual path to your photo file
        
        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from:  "sidhubhai1997@gmail.com",
            to: "st091799@gmail.com",
            subject: "Hello from Express!",

            text: "This is a test email sent from Express.js",
            html: "<b>This is a test email  for testing purpose</b>",
            
            attachments: [
                {
                    filename: 'download.png',
                    content: photo, // Attach the photo file here
                    encoding: 'base64' // Ensure proper encoding
                }
            ]
         });

  console.log("Message sent: %s", info.messageId);

    res.status(200).json({ message: "Email sent successfully" });
} 
catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
}
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
