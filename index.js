const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.post("/ussd", (req, res) => {
    // read the variables sent via post to our api
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;
    let response = " ";
    if (text === " ") {
        // this is the first request.
        response = `CON what would you like to check ?
        1. My Account
        2. My Phone Number`;
    }else if (text === "1") {
        // business logic for the first level response
        response = `CON choose account information you want to view
        1. Account Number
        2. Account Balance`;
    }else if (text === "2") {
        // get mobile number from the firebase data store
        //terminal request
        response = `END your phone number is ${phoneNumber}`
    }else if (text === "1*1") {
        // this is a second level response
        const accountNumber = "AC100101";
        // terminal request
        response = `END your account number is ${accountNumber}`
    } else if ("1*2") {
        // get data from the database
        const balance = "KES 10,000";
        // terminal request start with end
        response = `END your balance is ${balance}`;
    }
    //send response back to the api
    res.set("Content-Type: text/plain");
    res.send(response);
})

// create and deploy your firebase cloud functions

exports.ussd = functions.https.onRequest(app)