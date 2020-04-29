/* Local Script - Avvia le chiamate alla NOSTRA API */
submit.onclick = function()
{
  /* API 1 */
  let email = document.getElementById('email').value;
  let uri = 'http://localhost:3000/api/low/' + email;
  var data;
  var block;


  console.log("[DEBUG-mylocalscript]: Email --> " + email);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.withCredentials = false;
  xmlHttp.open("GET", uri, true); // false for synchronous request
  xmlHttp.onload = function(e)
  {
      if (xmlHttp.readyState === 4) //if ready
      {
          if (xmlHttp.status === 200) //if server response
          {
              console.log(xmlHttp.responseText); //write in log the response
              var data = JSON.parse(this.response);
              var block = data.block;
              console.log("Il valore di block è: " + block);

              //QUESTO è UN TEST
              if (block)
              {
                // la mail è spam 
                ris = document.getElementById('ris').innerHTML = ("This is a spam domain"); 
                console.log("La risposta del server è: " + JSON.stringify(data));
              }
              else if (!block)
              {
                // la mail non è spam
                ris = document.getElementById('ris').innerHTML = ("This is a genuine email");
                console.log("La risposta del server è: " + JSON.stringify(data));
              }
              else
              {
                console.error(xmlHttp.statusText);
              }

          }
          else
          {
              console.error(xmlHttp.statusText);
          }
      }
  }
  xmlHttp.onerror = function (e)
  {
    console.error(xmlHttp.statusText);
  }
  xmlHttp.send(null);
  console.log("[DEBUG-mylocalscript]: Sembra andare!");

  

   // Qui si attiva lo script JS collegato a index.html
   // In pratica questo è uno script locale che invia la richiesta alla NOSTRA API
   // Di conseguenza bisogna prendere la mail (da index.html), e configurare una richiesta "GET" alla nostra API
   // Sarà compito della nostra API che riceve la richiesta tramite questo script, inoltrare la mail catturata ai diversi provider
}
