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
              "url": "https://pumpkin-crisp-99157-4e86772f050c.herokuapp.com/execute"
          }
      },
      "configurationArguments": {
          "applicationExtensionKey": "80bef0b0-13c6-44ce-8ce9-a4d6d6664ccf",
          "save": {
              "url": "https://pumpkin-crisp-99157-4e86772f050c.herokuapp.com/save",
              "useJwt": false
          },
          "publish": {
              "url": "https://pumpkin-crisp-99157-4e86772f050c.herokuapp.com/publish",
              "useJwt": false
          },
          "validate": {
              "url": "https://pumpkin-crisp-99157-4e86772f050c.herokuapp.com/validate",
              "useJwt": false
          },
          "stop": {
              "url": "https://pumpkin-crisp-99157-4e86772f050c.herokuapp.com/stop",
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