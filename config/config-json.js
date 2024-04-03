module.exports = function configJSON(req) {
    return {
      "workflowApiVersion": "1.1",
      "name": "DC Stream Journey Action",
      "description": "Data Cloud journey action streaming API injector",
      "metaData": {
          "icon": "/icon.png",
          "category": "customer"
      },
      "type": "REST",
      "lang": {
          "en-US": {
              "name": "DC Stream Journey Action",
              "description": "Data Cloud journey action streaming API injector",
              "step1label": "Configure Streaming API"
          }
      },
      "arguments": {
          "execute": {
              "inArguments": [
                  {
                      "contactKey": "contactKey",
                      "emailAddress": "{{InteractionDefaults.Email}}",
                      "subscriberKey": "subscriberKey",
                      "journeyKey": "journeyKey",
                      "journeyName": "journeyName",
                      "journeyDesc": "journeyDesc",
                      "dataStreamName": "dataStreamName",
                      "dataStreamObjectName": "dataStreamObjectName",
                      "journeyAction": "journeyAction",
                      "timeStamp": "timeStamp"
                  }
              ],
              "outArguments": [],
              "useJwt": false,
              "timeout": 10000,
              "retryCount": 1,
              "retryDelay": 2000,
              "concurrentRequests": 6,
              "url": "https://<YOUR_APP_NAME>.herokuapp.com/execute"
          }
      },
      "configurationArguments": {
          "applicationExtensionKey": "<YOUR_INSTALLED_PACKAGE_KEY>",
          "save": {
              "url": "https://<YOUR_APP_NAME>.herokuapp.com/save",
              "useJwt": false
          },
          "publish": {
              "url": "https://<YOUR_APP_NAME>.herokuapp.com/publish",
              "useJwt": false
          },
          "validate": {
              "url": "https://<YOUR_APP_NAME>.herokuapp.com/validate",
              "useJwt": false
          },
          "stop": {
              "url": "https:/<YOUR_APP_NAME>.herokuapp.com/stop",
              "useJwt": false
          }
      },
      "wizardSteps": [
          {
              "label": "Configure Streaming API",
              "key": "step1"
          }
      ],
      "userInterfaces": {
          "configModal": {
              "height": 400,
              "width": 1000,
              "fullscreen": false
          }
      },
      "schema": {
          "arguments": {
              "execute": {
                  "inArguments": [
                      {
                          "contactKey": {
                              "dataType": "String",
                              "isNullable": false,
                              "direction": "in"
                          },
                          "emailAddress": {
                              "dataType": "Email",
                              "isNullable": false,
                              "direction": "in"
                          },
                          "subscriberKey": {
                              "dataType": "String",
                              "isNullable": false,
                              "direction": "in"
                          },
                          "journeyKey": {
                              "dataType": "String",
                              "isNullable": false,
                              "direction": "in"
                          },
                          "journeyName": {
                              "dataType": "String",
                              "isNullable": false,
                              "direction": "in"
                          },
                          "journeyDesc": {
                              "dataType": "String",
                              "isNullable": false,
                              "direction": "in"
                          },
                          "dataStreamName": {
                              "dataType": "String",
                              "isNullable": false,
                              "direction": "in"
                          },
                          "dataStreamObjectName": {
                              "dataType": "String",
                              "isNullable": false,
                              "direction": "in"
                          },
                          "journeyAction": {
                              "dataType": "String",
                              "isNullable": false,
                              "direction": "in"
                          }
                      }
                  ],
                  "outArguments": []
              }
          }
      }
  };
  };