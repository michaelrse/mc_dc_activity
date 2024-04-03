define(["postmonger"], function (Postmonger) {
  "use strict";

  var connection = new Postmonger.Session();
  // var authTokens = {};
  var payload = {}; //var payload = null; // ginge auch
  var steps = [{ label: "Configure Streaming API", key: "step1" }];
  var journeyKey = {};
  var journeyName = {};
  var journeyDesc = {};
  // When DOM is loaded onRender function is initialized
  $(function () {
    onRender();
  });

  connection.on("initActivity", initialize);
  connection.on("requestedEndpoints", onGetEndpoints);
  connection.on("requestedInteraction", onRequestedInteraction);
  connection.on(
    "requestedTriggerEventDefinition",
    onRequestedTriggerEventDefinition
  );
  connection.on("requestedDataSources", onRequestedDataSources);

  connection.on("clickedNext", save);

  function onRender() {
    // JB will respond the first time 'ready' is called with 'initActivity'
    connection.trigger("ready");
    connection.trigger("requestEndpoints");
    connection.trigger("requestInteraction");
    connection.trigger("requestTriggerEventDefinition");
    connection.trigger("requestDataSources");
  }
  function onRequestedDataSources(dataSources) {
    console.log("*** requestedDataSources ***");
    console.log(dataSources);
  }
  function onRequestedTriggerEventDefinition(eventDefinitionModel) {
    console.log("*** requestedTriggerEventDefinition ***");
    console.log(eventDefinitionModel);
  }
  //Data is the response has:  (payload): { name: 'MyActivity', metaData: {}, arguments: {},
  // configurationArguments: {}, outcomes: [], errors: [] }
  function initialize(data) {
    console.log(data);
    if (data) {
      payload = data;
    }

    connection.trigger("requestInteraction");
    console.log("Request Journey Data");
  }

  function onGetEndpoints(endpoints) {
    console.log(endpoints);
  }

  function onRequestedInteraction(interaction) {
    var responseData = interaction;

    journeyKey = responseData.key;
    journeyName = responseData.name;
    journeyDesc = responseData.description;

    console.log("*** requestedInteraction ***");
    console.log(interaction);
  }

  function save() {
    let dataStreamName = $("#data-stream-name").val();
    let dataStreamObjectName = $("#data-stream-object-name").val();
    let journeyAction = $("#journey-action").val();
    let timeStamp = new Date().toISOString();

    payload["arguments"].execute.inArguments = [
      {
        contactKey: "contactKey",
        emailAddress: "{{InteractionDefaults.Email}}",
        subscriberKey: "subscriberKey",
        journeyKey: journeyKey,
        journeyName: journeyName,
        journeyDesc: journeyDesc,
        dataStreamName: dataStreamName,
        dataStreamObjectName: dataStreamObjectName,
        journeyAction: journeyAction,
        timeStamp: timeStamp,
      },
    ];

    payload["metaData"].isConfigured = true;

    console.log(payload);
    // Sends message to JB updates the configured payload for excute inArguments
    connection.trigger("updateActivity", payload);
  }
});
