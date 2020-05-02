# Hastemail
A Simple API for check Spam and Temporary mails

![Demo](https://i.imgur.com/eYv6KLG.png)


[DOWNLOAD - CLIENT]() | [SOURCE - API]() | [ISSUE](https://bit.ly/336o6z6)

## Index
- [Patch Note](#all-changes)


## How is set-up hastemail?:
Type | Are the *Spam* domains blocked?| Are the *BlackList* emails blocked? | Are the *Unavailable* emails blocked?  
:-: | :-: | :-: | :-: | 
`Are they blocked?` | *yes* | *yes* | *no* |

## About the scan ...
Hastemail, simply check a local database made in JSON for check if an email is currently signed as malicious. New functions allow hastemail to check if a domain is reliable and secure, and the api can reject the disposable and spam domains!


## All Changes:


### Update [29/4/2020]

- [x] New repository for Hastemail
- [x] Code and dependecies cleared
- [x] Hastemail now check private database in JSON
- [x] New readme, new start, new stuff 😊


### Update [02/05/2020]

- [x] Added function for check the entire blacklist
- [x] Added function for check if a single email is present into black list 
- [x] Added function for append new emails to blacklist
- [x] Added function for delete emails from blacklist 😊

#### New

- [x] Now the "add" function doesn't allow you to enter the same email twice (if already present)
- [x] Delete function doesn't delete the first email anymore, but check the entire array if an email is insert twice
- [x] Check function fixed, now correctly send the response 
- [x] Fixed all HTTP status 
- [x] Code clear








