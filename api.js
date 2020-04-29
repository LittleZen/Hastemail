/********************************************************************************* Haste Mail version 1.0 *********************************************************************************************/

// General API Server Configuration //
const express = require('express');
const cors = require('cors');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const bodyParser = require('body-parser');
const sha256 = require("js-sha256");
//const router = express.Router();
var fs = require('fs');


// App Settings //
const PORT = process.env.PORT || 3000;
const app = express();


// Import bodyparser settings //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(bodyParser.json());


// Main Page + CORS //
app.use(cors());
app.options('*', cors());
app.use(express.static('public'));


//Set-up xml request
var Http = new XMLHttpRequest();


/********************************************************************************************************************************************************************************************* */
                                                                                       // - General Function - //
/********************************************************************************************************************************************************************************************* */
function testing(req, response) 
{
    let rawdata = fs.readFileSync('test.json');
    let student = JSON.parse(rawdata);
    console.log(student);
    return(student);
};


/********************************************************************************************************************************************************************************************* */
                                                                                      // - Api Services - //
/********************************************************************************************************************************************************************************************* */

// Testing function //
// Basic test = listen ()
app.listen(PORT, function() 
{
    console.log(`\nQui il server gira in ascolto, in attesa di ricevere la mail.\n\n Il server è in ascolto alla porta: ${PORT}`);
});

app.get('/json', function(req, res)
{
    var risultato = testing();
    res.status(200).send(risultato).end();
});

app.get('/status', function(req, res)
{
    res.status(200).send("Tutto ok!").end();
});





