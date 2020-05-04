/********************************************************************************* Haste Mail version 1.1 *********************************************************************************************/

// General API Server Configuration //
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sha256 = require("js-sha256");
const fs = require('fs');


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


//Account for login
//User: jack
//PSW: pdgt2020
const logins = new Map();
logins.set('jack', { salt: '01041999', hash: '039c86dcbd5b4293cfda4a08c1a3047b0294af42b2c39eb0e12e5e0b0eab4fc3' });


/********************************************************************************************************************************************************************************************* */
                                                                                       // - General Function - //
/********************************************************************************************************************************************************************************************* */
//check the entire black-list
function testing() 
{
    let rawdata = fs.readFileSync('pvt.json');
    let mydata = JSON.parse(rawdata);
    console.log(mydata);
    return(mydata);
};


//Check if an email is present in blacklist
function filter(email) 
{
  var myarray = [];
  let rawdata = fs.readFileSync('pvt.json'); //get local database 
  let mydata = JSON.parse(rawdata); //parsing local db 
  var myarray = JSON.stringify(mydata.blacklist);
  var result = myarray.includes(email); //function used for check if an email is already present 
  if(!result)
  {
    return(false);
  }
  else
  {
    return(true);
  }
};


// add an email to blacklist 
function addemail(email) 
{
    //Open local file
    let rawdata = fs.readFileSync('pvt.json'); //Opening local database 
    let mydata = JSON.parse(rawdata); //parse 
    let originaldata = JSON.parse(rawdata); 

    //it will create a new array without the "key" entered, in this case the var "email"
    mydata.blacklist = mydata.blacklist.filter(entry => entry.email !== email); 

    // if dimension is equal to original json , the email you are looking for is not present
    if(JSON.stringify(mydata)==JSON.stringify(originaldata)) 
    {
      mydata['blacklist'].push({"email":email}); //insert new email
      let data = JSON.stringify(mydata, null, 2); //convert all in json
      fs.writeFileSync('pvt.json', data); //overwrite the changes
      return(true); 
    }
    else 
    {
      return(false);
    }
};


// Delete an email from blacklist
function cancel(email) 
{
  
    let rawdata = fs.readFileSync("pvt.json"); //Opening local database 
    let mydata = JSON.parse(rawdata); //parse
    let originaldata = JSON.parse(rawdata); //get a copy 

    //it will create a new array without the "key" entered, in this case the var "email"
    mydata.blacklist = mydata.blacklist.filter(entry => entry.email !== email);

    //check if the email submitted is not already present
    if(JSON.stringify(mydata)==JSON.stringify(originaldata)) 
    {
      console.log("La funzione cancel è nel ramo if");
      return(false);
    }
    else
    {
      console.log("La funzione cancel è nel ramo else");
      let data = JSON.stringify(mydata, null, 2);  //convert all in json
      fs.writeFileSync('pvt.json', data); //overwrite the changes
      return(true);
    }
    
}

// Login function (check user and password)
function attemptLogin(username, password) 
{
  if(!logins.has(username)) 
  {
    return false;
  }
  
  const user = logins.get(username);
  
  const compound = user.salt + password;
  const h = sha256.create();
  h.update(compound);
  
  console.log("Verifying " + user.hash + " == " + h.hex());
  
  return h.hex() == user.hash;
}

// Login function (callback)
function authentication(username, password)
{
  if(!attemptLogin(username, password)) 
  {
    console.log("Autenticazione errata!");
    return (false);
  }
  console.log("Sei autenticato!");
  return (true);
}


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
app.get('/', function(req, res)
{
    res.status(200).send("Server is running...").end();
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
  let user = req.params.id; 
  let example = filter(user);
  console.log(example); 

  if(!example)
  {
    res.status(200).json({block: false}); 
  }
  else
  {
    res.status(200).json({block: true}); 
  }
});

//Add new mail to blacklist
app.patch('/add/:id', function(req, res)
{
  const username = req.query.username;
  const password = req.query.password;
  let result = authentication(username, password);

  if(!result)
  {
    res.status(403).send("You must be logged-in order to add emails to blacklist!").end();
  }
  else
  { 
    "use strict";
    let user = req.params.id; // catch email address
    console.log("\nSto aggiungendo l'email: " + user + "\n");
    let aggiunto = addemail(user);
    console.log("Aggiunto vale:" + aggiunto);
    if(!aggiunto)
    {
      res.status(201).json({added: false}); 
    }
    else
    {
      res.status(201).json({added: true});
    }
  }
 
});


//Delete an email from blacklist 
app.delete('/delete/:id', function(req, res)
{
  const username = req.query.username;
  const password = req.query.password;
  let result = authentication(username, password);

  if(!result)
  {
    res.status(403).send("You must be logged-in order to delete emails from the blacklist!").end();
  }
  else
  { 
    let user = req.params.id; 
    let cancella = cancel(user);
    if(!cancella)
    {
      res.status(200).json({deleted: false}); 
    }
    else
    {
      res.status(200).json({deleted: true});
    }
  }
  
});


// Login System 
app.post('/login', (req, res) => 
{
  const username = req.query.username;
  const password = req.query.password;
  let result = authentication(username, password);

  if(!result)
  {
    res.status(403).json({login: false}).end();
  }
  else
  { 
    res.status(200).json({login: true}).end();
  }
});





