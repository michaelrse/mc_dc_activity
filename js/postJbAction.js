const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// Make call to streaming API
const postJbAction = async (payload, dataStream) => {
    try {
      let data = payload;
      
      let dataStreamName = dataStream;
      console.log(dataStreamName);
      let authToken = process.env.OFFCORE_TOKEN;
      let tsEndpoint = process.env.TENANT_SPECIFIC_ENDPOINT;
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      // Make API call using Axios
      const response = await axios.post(
        `${tsEndpoint}/api/v1/ingest/sources/${dataStreamName}`,
        data,
        config
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error posting to Streaming API:", error);
      throw error; // Rethrow the error for handling it in the caller function
    }
  };

module.exports = postJbAction;
