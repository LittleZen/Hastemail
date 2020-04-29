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

//check json file 
function testing() 
{
    let rawdata = fs.readFileSync('test.json');
    let mydata = JSON.parse(rawdata);
    console.log(mydata);
    return(mydata);
};


//filter json file
function filter(email) 
{
    let rawdata = fs.readFileSync('pvt.json');
    let mydata = JSON.parse(rawdata);

     //
    //const result = myData.filter((x) => x.email === email);
   // 
        const result = mydata.filter(obj => {
          for (let [key, value] of Object.entries(obj)) {
            if (value === email) {
              return true;
            }
          }
        });
        console.log(result); // [ { '2': 'bad@gmail.com' } ]
        return result.length > 0;
      
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

app.get('/pvt', function(req, res)
{
let example = filter("bad@gmail.com");
console.log("risposta: " + example); // example è una variabile true/false, la puoi utilizzare per verificare se un email è presente!!
});






