import {OPEN_AI_KEY} from "../config/secrets";

const { Configuration, OpenAIApi } = require("openai");



const configuration = new Configuration({
    apiKey: OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export const GenerateTextService = {

    /**
     *
     * @param usersTranscriptSentence - string, may be incorrect
     * @returns {Promise<void>}
     */
    async getCorrectFormOfSentence(usersTranscriptSentence) {

        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: "Correct this sentence: " + usersTranscriptSentence.toString() + "\n\nCorrected to:",
        });
        return completion.data.choices[0].text
    }

}
