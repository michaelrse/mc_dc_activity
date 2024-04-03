"use strict";

const postJbAction = require("./postJbAction");
const getSFToken = require("./getSFToken");

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );

  res.status(200).send("Edit");;
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );

  res.status(200).send("Save");
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = async (req, res) => {
  try {
    await getSFToken();

    let responseData = await req.body;
    console.log(req.body);
    res.status(200).json({
      status: "success",
    });
    // Save DataStreamName
    let dataStreamNameValue = responseData.inArguments[0].dataStreamName;
    let dataStreamObjectNameValue =
      responseData.inArguments[0].dataStreamObjectName;

    let inArguments = responseData.inArguments[0];

    console.log(inArguments);

    let dataStream = `${dataStreamNameValue}/${dataStreamObjectNameValue}`;

    console.log(dataStream);

    const { dataStreamName, dataStreamObjectName, ...ogPayload } = inArguments;
    const newTimeStamp = new Date().toISOString();
    const updatedPayload = { ...ogPayload, timeStamp: newTimeStamp };

    const payload = { data: [updatedPayload] };

    console.log(payload);

    await postJbAction(payload, dataStream);

    // console.log(getpostJbAction);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500);
  }
};

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );

  res.status(200).send("Publish");
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );

  res.status(200).send("Validate");
};

exports.unpublish = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );

  res.status(200).send("Unpublish");;
};
