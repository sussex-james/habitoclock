import { remoteUrl } from "../config/secret.js";

export const WattUsageAndEmojisService = {
  async getWattUsageAndEmojis(topics) {
    return await fetch(remoteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topics: topics }),
    })
      .then((resp) => {
        console.log("Response was: ", resp);
        return resp.json();
      })
      .then((json) => {
        console.log("JSON: ", json);
        console.log(json.result);
        return json.result;
      });
  },
};
