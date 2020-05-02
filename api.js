/********************************************************************************* Haste Mail version 1.0 *********************************************************************************************/

// General API Server Configuration //
const express = require('express');
const cors = require('cors');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const bodyParser = require('body-parser');
const sha256 = require("js-sha256");
const editJsonFile = require("edit-json-file");
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
    let rawdata = fs.readFileSync('pvt.json');
    let mydata = JSON.parse(rawdata);
    console.log(mydata);
    return(mydata);
};


//filter json file
function filter(email) 
{
  let rawdata = fs.readFileSync('pvt.json');
  let mydata = JSON.parse(rawdata);
  var myarray = [];
  var myarray = JSON.stringify(mydata.blacklist);
  var result = myarray.includes(email);
  if(!result)
  {
    return(false);
  }
  else
  {
    return(true);
  }
};

function addemail(user) 
{
  let rawdata = fs.readFileSync('pvt.json'); 
  let data = JSON.parse(rawdata);
  console.log(data);

  /*let rawdata = fs.readFileSync('pvt.json'); 
  let data = JSON.parse(rawdata);

  let struct = 
  { 
    "1":user
  };

  data.push(struct);

  mydata = JSON.stringify(data);

  fs.writeFileSync('pvt.json', mydata);
  */
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


//Check Server status
app.get('/status', function(req, res)
{
    res.status(200).send("Tutto ok!").end();
});


//Check entire database 
app.get('/list', function(req,res)
{
  let lista = testing();
  res.send(lista);
});


//Check if and id is present in to the list
app.get('/check/:id', function(req, res)
{
  let user = req.params.id; // catch email address
  let example = filter(user);
  console.log(example); // example è una variabile true/false, la puoi utilizzare per verificare se una mail è presente!!

  if(!example)
  {
    res.status(404).json({block: false}); // se non è presente, ritorna 404 + json false
  }
  else
  {
    res.status(302).json({block: true}); // se presente, ritorna 302 + json true
  }
});

//Check Server status
app.patch('/add/:id', function(req, res)
{
  "use strict";
  let user = req.params.id; // catch email address
  console.log("\nSto aggiungendo l'email: " + user + "\n");
  let aggiunto = addemail(user);
  //function
});






