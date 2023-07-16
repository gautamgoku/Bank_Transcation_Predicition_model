// 1.Import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { PythonShell } = require('python-shell');
const { DataFrame } = require("pandas-js");


// 2. set up app and middleware
const app = express();

// 3. start server 
const route = require("./routes/wsl");
const { accountMap } = require("./uitils/uitils");
app.use(bodyParser.json()); //body parser used to read json data, without this it was not working
// app.use("",route);
// Parse JSON request bodies
app.use(express.json());

app.post('/score', async(req, res) => {
    // Get input data from the request body
    const { year ,month,costCenter,account} = req.body;
    console.log(year ,month,costCenter,account)

    // creating a template for the body 
    const template = {"Year_2019": [0], "Year_2020": [0], "Year_2021": [0], "Month_Apr": [0], "Month_Aug": [0], "Month_Dec": [0], "Month_Feb": [0], "Month_Jan": [0], "Month_Jul": [0], "Month_Jun": [0], "Month_Mar": [0], "Month_May": [0], "Month_Nov": [0], "Month_Oct": [0], "Month_Sep": [0], "Cost Centre_CC100": [0], "Cost Centre_CC101": [0], "Cost Centre_CC102": [0], "Cost Centre_CC200": [0], "Cost Centre_CC201": [0], "Cost Centre_CC202": [0], "Cost Centre_CC300": [0], "Cost Centre_CC301": [0], "Cost Centre_CC302": [0], "Account_ACC1000000": [0], "Account_ACC1000001": [0], "Account_ACC1000002": [0], "Account_ACC1000004": [0], "Account_ACC2000000": [0], "Account_ACC2000001": [0], "Account_ACC2000002": [0], "Account_ACC2000003": [0], "Account_ACC2000005": [0], "Account_ACC3000000": [0], "Account_ACC3000002": [0], "Account_ACC4000001": [0], "Account Type_Asset": [0], "Account Type_Expense": [0], "Account Type_Liability": [0], "Account Type_Revenue": [0]} ;

    // inputing values sent from user
    template[`Year_${year}`] = [1]
    template[`Month_${month}`] = [1]
    template[`Cost Centre_${costCenter}`] = [1]
    template[`Account_ACC${account}`] = [1]
    template[`Account Type_${accountMap[account]}`] = [1]
    
    //converting to string cause only then it works
    const jsonString = JSON.stringify(template);
        
    //const inputData ='{"Year_2019": [0], "Year_2020": [0], "Year_2021": [1], "Month_Apr": [0], "Month_Aug": [0], "Month_Dec": [0], "Month_Feb": [0], "Month_Jan": [0], "Month_Jul": [1], "Month_Jun": [0], "Month_Mar": [0], "Month_May": [0], "Month_Nov": [0], "Month_Oct": [0], "Month_Sep": [0], "Cost Centre_CC100": [1], "Cost Centre_CC101": [0], "Cost Centre_CC102": [0], "Cost Centre_CC200": [0], "Cost Centre_CC201": [0], "Cost Centre_CC202": [0], "Cost Centre_CC300": [0], "Cost Centre_CC301": [0], "Cost Centre_CC302": [0], "Account_ACC1000000": [0], "Account_ACC1000001": [0], "Account_ACC1000002": [0], "Account_ACC1000004": [0], "Account_ACC2000000": [0], "Account_ACC2000001": [0], "Account_ACC2000002": [1], "Account_ACC2000003": [0], "Account_ACC2000005": [0], "Account_ACC3000000": [0], "Account_ACC3000002": [0], "Account_ACC4000001": [0], "Account Type_Asset": [0], "Account Type_Expense": [1], "Account Type_Liability": [0], "Account Type_Revenue": [0]}';
    const inputData = jsonString;

    //define input variables for the pythonshell
    let op = {
        args: [inputData]
    };

    //run the python shell for output of prediction
    PythonShell.run('regression_model.py', op).then(messages => {
        console.log(messages[0]);
        res.send(messages[0])
    });
  });


//setting up port for our project
const port = 3001

//run the server
app.listen(port,() => {
    console.log("hello")
})