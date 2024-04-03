# Journey Builder Data Cloud streaming API action

## NOTE: This app and the associated code is NOT production quality, it’s pure purpose is to demonstrate the full flow of custom interactions in Marketing Cloud Journey Builder to Data Cloud. 

Hi there, 

ever wondered in what journey your customers end up? Which way or what branch they took during their customer journey? You also would like to add some journey context? And you want this information in the Data Cloud? 

The DC Stream Journey Action Activity could help :) 

This custom activity can be used within a journey branch to update a DLO or DMO in Data Cloud. It will use a streaming API Data Stream to send journey information back to the Data Cloud.

The payload that Data Cloud will receive contains these values.

``` "inArguments": [
            { "contactKey":"{{Contact.Key}}",
              "emailAddress": "{{InteractionDefaults.Email}}",
              "subscriberKey":"{{InteractionDefaults.SubscriberKey}}",   
              "journeyKey": "journeyKey",
              "journeyName":"journeyName",
              "journeyDesc": "journeyDesc",
              "dataStreamName": "dataStreamName",
              "dataStreamObjectName": "dataStreamObjectName",
              "journeyAction" : "journeyAction", //Free text, just give it a name
              "timeStamp": "timeStamp"
            }
          ], 
```
## Pre-Requisites:

* Marketing Cloud Installed Package: Custom Journey Builder Activity
* Create security certification for Data Cloud and your app
* Data Cloud:
    * Connected App: JWT Bearer Token Flow
    * Data Stream with this schema: jbAction.yaml

* Node.Js installed on your machine
* Git installed 
* Heroku Account for hosting your app
    * Heroku CLI installed on your machine

## Configure your package in Marketing Cloud

You need to add a custom activity via “installed packages“ in setup.  

1. Login to Marketing Cloud and Navigate to Administration > Account > Installed Packages
2. Click on New and enter a name and a description for your package
3. Click on Add Component, select Journey Builder Activity, select “customer update” and click next
4. Enter the information about the activity, enter [url of your activity] as your Endpoint URL
5. Click Save
6. Copy the Unique Key value from the Journey Builder Activity panel and save it for later

## Create Data Stream

Just make sure that the schema for the Data Stream looks like this. You can copy paste the file and save it into a .yaml file and upload it for your Data Stream schema. Don’t forget to include the object name of the data stream!

```
openapi: 3.0.3
components:
  schemas:
    <YOUR DATA STREAM OBJECT NAME>:
      type: object
      properties:
        contactKey:
          type: string
        emailAddress:
          type: string
        subscriberKey:
          type: string
        journeyKey:
          type: string
        journeyName:
          type: string
        journeyDesc:
          type: string
        journeyAction:
          type: string
        timeStamp:
          type: string
          format: date-time
```

## Generate Public Private Key

* Run these commands at once in the Terminal. Just skip the next steps to let the values blank.
```openssl req  -nodes -new -x509  -keyout private.pem -out server.cert ```
* It will generate RSA Keys and will save the informations in 2 files named “server.cert” & “private.pem“. 
* Server.cert will be uploaded in Data Cloud during Connected App configuration.

## Configure Connected App in Data Cloud 

Follow the steps as pointed out in the [help docs](https://help.salesforce.com/s/articleView?id=sf.connected_app_create.htm&type=5).It is basically the same as connecting Postmann ie.for the first time (check for in setup process: All users may self-authorize, Relax IP restrictions, ). It is critical to make the next step “Authenticate app via browser” for the app to run.

## Authenticate app via browser

For the auth flow to work without prompting you need to authenticate at least one time with the normal auth. You can make the authentication request via the browser. It holds all the information for the server in the URL. When you enter the URL browser window will open. Just confirm the message. 

(https://<YOUR_ORG_URL>/services/oauth2/authorize?response_type=code&client_id=<YOUR_CONSUMER_KEY>&scope=api refresh_token cdp_profile_api cdp_query_api cdp_ingest_api&redirect_uri=https://whatever.de/callback)

## Clone repo from Github

* Run Terminal from root folder the run: npm install This will install all the dependencies from the package.json file.
* To test locally run ```node index.js```  the index.html will be served to http://127.0.0.1:3001/
* use route with POST and this payload for request to 127.0.0.1:3001/execute with Postman to test Ingestion API 
* {
        
           "inArguments":[
           {
              "contactKey": "test",
              "emailAddress": "test",
              "subscriberKey": "test_key",
              "journeyKey": "Test Key Journey",
              "journeyName": "Test Journey",
              "journeyDesc": "Journey Action",
              "journeyAction": "Hello Real World",
              "timeStamp": "2024-27-03 12:16:00.000",
              "dataStreamObjectName": <your _object_name>,
              "dataStreamName": <your_data_stream_name>
            }
           ]
    }
* open config/config-json.js
    * Replace the value in “applicationExtensionKey” with the one from your installed package.  
    * Replace all the domains with your app’s domain name


* add your private.pem file to <root_folder>/config (make sure to exclude this file in your git push if you want to make the repo public)
* for testing include a config.env file with the config vars
* open public/images: Feel free to customise the icons for your JB activity. Format needs to be 40x40. 
* adjust the inArguments key values with ```{{Contact.Key}} or {{InteractionDefaults.SubscriberKey}}``` for additional journey data binding. I found out that it works better with static values for these two ids when testing.

## Use Git for staging and initial commit

* Run Terminal from the root folder of your app
    * Initialise repo: ```git init```
    * stage your all your files: ```git add -A```
    * commit: ```git commit -m'initial commit'```
    * Push to Github if needed

## Add Github repo and connect to git

```git remote add origin https://github.com/<yourgit>/<your_app>.git
git branch -M main
git push -u origin main
```

## Create Heroku App

* login to Heroku: ```heroku login```
* add a git remote to heroku: ```git remote add heroku <heroku-git-url>```
* finally deploy app: ```git push heroku main```

This should install the app to your heroku account. Inside Heroku there is a button called “open app”. It will serve the HTML to your browser. Feel free to check in the console if all the .js files have been loaded. 


## Add Heroku vars

1. Log into Heroku and navigate to your app
2. Click on "Settings"
3. Click on "Reveal config vars"
4. Add these configuration variables
```
CLIENT_ID=<Consumer key of your connected app>
CLIENT_SECRET_ID=<Consumer secret of your connected app>
REDIRECT_URI=https://login.salesforce.com
USERNAME=<Data Cloud User>
PASSWORD=<your password>
PORT=3001
TOKEN=<leave this blank>
TENANT_SPECIFIC_ENDPOINT=<your data cloud tenant specifc endpoint>
OFFCORE_TOKEN=<leave this blank>
MY_SF_URL=<Your Data Cloud my SF domain>
```