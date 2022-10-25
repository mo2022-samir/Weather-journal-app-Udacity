// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser'); 

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
// intialize port
const port = 8000;

app.listen(port,()=> {console.log(`server running on ${port}`)})

// intialize post path
app.post('/sendData',(req,res) => {
    const {newDate , temp,feelings} = req.body;
    projectData.date = newDate;
    projectData.temp = temp;
    projectData.feelings = feelings;
    console.log(projectData)
    res.end();
})

// intialize get path
app.get('/getData', (req,res) => {
    res.send(projectData);
});