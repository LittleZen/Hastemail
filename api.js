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

function addemail(email) 
{
    //Open local file
    let rawdata = fs.readFileSync('pvt.json'); //leggi il json
    let mydata = JSON.parse(rawdata); //parse per renderlo leggibile e usabile 
    let originaldata = JSON.parse(rawdata); 

    mydata.blacklist = mydata.blacklist.filter(entry => entry.email !== email);

    // se uguale, l'email non è presente nel filtro, la dimensione degli array è uguale e quindi deve essere aggiunta
    if(JSON.stringify(mydata)==JSON.stringify(originaldata)) 
    {
      mydata['blacklist'].push({"email":email}); //inserisci la nuova mail nell'array
      let data = JSON.stringify(mydata, null, 2); //utilizzo della funzione stringify + formattazione 
      fs.writeFileSync('pvt.json', data); //sovrascrittura del file precedente con il nuovo (che comprende la nuova mail)
      return(true); //return true per far vedere che è andato tutto a buon fine ! 
    }
    else // se sei nel ramo else, è perchè la dimensione dell'array originale è maggiore di quella filtrata, quindi l'email è presente
    {
      return(false);
    }
};



function cancel(email) 
{
  
    let rawdata = fs.readFileSync("pvt.json"); //get local json file
    let mydata = JSON.parse(rawdata); //parsing rawdata
    let originaldata = JSON.parse(rawdata);

    mydata.blacklist = mydata.blacklist.filter(entry => entry.email !== email);

    if(JSON.stringify(mydata)==JSON.stringify(originaldata)) // if equal, email is not deleted cause not found!
    {
      console.log("La funzione cancel è nel ramo if");
      return(false);
    }
    else
    {
      console.log("La funzione cancel è nel ramo else");
      let data = JSON.stringify(mydata, null, 2); //utilizzo della funzione stringify + formattazione 
      fs.writeFileSync('pvt.json', data);
      return(true);
    }
    
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

//Add new mail to blacklist
app.patch('/add/:id', function(req, res)
{
  "use strict";
  let user = req.params.id; // catch email address
  console.log("\nSto aggiungendo l'email: " + user + "\n");
  let aggiunto = addemail(user);
  console.log("Aggiunto vale:" + aggiunto);
  if(!aggiunto)
  {
    res.status(422).json({added: false}); // se l'email è già presente
  }
  else
  {
    res.status(201).json({added: true}); // se la richiesta si riesce a soddisfare + 201 (Created)
  }
});


//Delete an email from blacklist 
app.delete('/delete/:id', function(req, res)
{
  let user = req.params.id; // catch email address
  let cancella = cancel(user);
  if(!cancella)
  {
    res.status(404).json({deleted: false}); // se non si riesce ad eliminare la mail = 404 (Not found)
  }
  else
  {
    res.status(302).json({deleted: true}); //se si riesce ad eliminare la mail =  302 (found)
  }
});






