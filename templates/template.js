import mjml2html from 'mjml';
const User = require("../models/User")

const username  = User.username;

module.exports = {
    templateExample: (message, username, token) => { 
        const htmlOutput = mjml2html(`
        <mjml>
            <mj-body background-color="#ffffff" font-size="13px">
                <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
                <mj-column vertical-align="top" width="100%">
                    <mj-image src="https://res.cloudinary.com/dyvopd0iz/image/upload/v1614664556/BookSwapp/markus-clemens-9ShzlH_o2Yk-unsplash_hggqee.jpg" alt="" align="center" border="none" width="600"  padding-left="0px" padding-right="0px" padding-bottom="0px" padding-top="0"></mj-image>
                </mj-column>
                </mj-section>
                <mj-section background-color="#009FE3" vertical-align="top" padding-bottom="0px" padding-top="0">
                <mj-column vertical-align="top" width="100%">
                    <mj-text align="left" color="#ffffff" font-size="45px" font-weight="bold" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="30px" padding-top="50px">Hello Swapper!</mj-text>
                </mj-column>
                </mj-section>
                <mj-section background-color="#009fe3" padding-bottom="20px" padding-top="20px">
                <mj-column vertical-align="middle" width="100%">
                    <mj-text align="left" color="#ffffff" font-size="22px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px"><span style="color:#FEEB35">Dear ${username}</span><br /><br /> Welcome to BookSwapp.</mj-text>
                    <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">${message}We&apos;re really excited you&apos;ve decided to give us a try. Please confirm your emai, so you can log in.</mj-text>
                    <mj-button align="left" font-size="22px" font-weight="bold" background-color="#ffffff" border-radius="10px" color="#1AA0E1" font-family="open Sans Helvetica, Arial, sans-serif"> <a text-decoration="none" href="http://localhost:3000/auth/confirm/${token}">Confirm email</a> </mj-button>
                    <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Happy swapping, <br /> The BookSwapp Team</mj-text>
                </mj-column>
                </mj-section>
            </mj-body>
            </mjml>`, options)
        return htmlOutput;
    }
}