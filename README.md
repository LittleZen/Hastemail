# Hastemail
A Simple API for check Spam and Malicious mails

![Demo](https://i.imgur.com/eYv6KLG.png)


[CLIENT](https://bit.ly/35wj3cG) | [ISSUE](https://bit.ly/336o6z6) | [HEROKU](https://bit.ly/2SBDI9V)

## Index
- [Presentazione Api](#presentazione-api)
- [Collegarsi a HastEmail](#collegarsi-a-hastemail)
- [Architettura e scelte di progetto](#architettura-e-scelte-di-progetto)
- [Servizi esterni utlizzati](#servizi-esterni-utlizzati)
- [About hastemail](#about-hastemail)
- [Licenza](#licenza)
- [Patch Note](#all-changes)

-----------
### Presentazione API
HasteEmail è un Servizio Web che consente di filtrare le email segnalate come spam o che sono state riconosciute come ingannevoli. Il suo obiettivo è quello di proteggere i vari siti web che la implementano, al fine di validare una corretta registrazione di un utente, e negare l'accesso a bot o malintenzionati.
HastEmail ha quindi diverse funzionalità:
>1. Si può inviare una richiesta `GET` al server contenente una mail, questa verrà cercata nel database locale
>2. Si può inviare una richiesta `GET` generica al server, lo stesso risponderà con la lista di tutte le mail presenti in blacklist
>3. Si può inviare una richiesta `DELETE`al server contenente una mail, questa verrà eliminata dal database locale*
>4. Si può inviare una richiesta `PATCH`al server contenente una mail, questa verrà aggiunta al database locale*


###### * = Queste richieste necessitano di autenticazione. L'api protegge i verbi `PATCH` e `DELETE` con la Basic Authentication  
-----------
### Collegarsi a HastEmail
Per collegarsi ad HastEmail è necessario eseguire delle semplici richieste in http, impostando il verbo giusto.
Di eseguito la documentazione per inoltrare correttamente la richiesta:

#### Inviare le richieste
- `/status`: metodo **GET**, verifica che il server funzioni correttamente. In caso di riscontro positivo ritorna status 200 (OK)
- `/list`: metodo **GET**, ritorna un file Json contenente tutte le mail presenti nel database locale
- `/check/:id`: metodo **GET**, verifica che un'email sia presente o meno nella blacklist. Ritorna un oggetto Json di tipo {block: t/f}
- `/add/id`: metodo **PATCH**, consente di inserire una mail nella blacklist. Ritorna un oggetto json del tipo {added: t/f}
- `/delete/id`: metodo **DELETE**, consente di eliminare una mail dalla blacklist. Ritorna un oggetto json del tipo {deleted: t/f}
-----------
### Architettura e scelte di progetto
L'architettura è stata scelta basandosi sul modello API-RESTful, ed è implementata come segue:
1. Server scritto in NodeJS + Express 
2. Protezione di alcune delle funzioni dell'API in Basic Authentication (con password in sha256 + salt)
3. Database scritto in JSON (nome: pvt.json)
4. Implementazione della piattaforma su Heroku

###### Si è scelto di non fornire alcun metodo di registrazione. Gli account amministratori, dovranno essere creati dal webadmin 
-----------
### Servizi esterni utlizzati
Per promuovere l'app, si è scelto di utilizzare il servizio Heroku, che oltre a garantire un canale HTTPS, fornisce un sistema di *Automatic deploys* sulla risorsa GitHub per il *continuous integration* degli update. Non è obbligatorio utilizzare la risorsa heroku, difatti l'api è stata progettata per funzionare anche in locale, bypassando le limitazioni in CORS e garantendo uno sviluppo fluido anche in localhost. Infine la stessa API si appoggia ad alcune librerie di terze parti per eseguire alcune funzioni.
Di seguito le librerie utilizzate:

Library | Description
--- | --- 
`express` | *NodeJS Framework*
`cors` | *System used for bypass CORS limitation*
`bodyParser` | *middleware for parsing the response*
`sha256` | *Hasing lib used for hash password in basic auth*
`fs` | *Lib used for get local file (blacklist)*
-----------
### About hastemail
About | Description
--- | --- 
`Developer` | *Jacopo M. Mengarelli (Zenek @Hastro)*
`Matricola` | *292728*
`LOCATION` | *Italy*
`API` | *NodeJS + Javascirpt + Express*
-----------

### Licenza
Per la scelta della licensa si è scelto di utilizzare il servizio "https://choosealicense.com/", che sulla base delle informazioni fornite, e cioè sulla necessità di mentenere il codice più aperto e utilizzabile possibile, ha suggerito l'implementazione della licenza GNU V3


-----------
## All Changes:


### Update [29/4/2020]

- [x] New repository for Hastemail
- [x] Code and dependecies cleared
- [x] Hastemail now check private database in JSON
- [x] New readme, new start, new stuff 😊
-----------

### Update [02/05/2020]

- [x] Added function for check the entire blacklist
- [x] Added function for check if a single email is present into black list 
- [x] Added function for append new emails to blacklist
- [x] Added function for delete emails from blacklist 😊

#### New

- [x] Now the "add" function doesn't allow you to enter the same email twice (if already present)
- [x] Delete function doesn't delete the first email anymore, but check the entire array if an email is insert twice
- [x] Check function fixed, now correctly send the response 
- [x] Fixed all HTTP status code
- [x] Code clear

-----------
### Update [04/05/2020]

- [x] Deleted unnecessary file
- [x] Deleted HTML folder
- [x] Fixed status code
- [x] Comments cleared
- [x] Code clear

#### New

- [x] Client Released
- [x] Api is now hosted on Heroku!
- [x] License GNU V3

-----------
### Update [29/10/2020]

- [x] CVE-2020-8147 Vulnerability Mitigated
- [x] Minor BugFix and comments/log fixed










