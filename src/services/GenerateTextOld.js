import {OPEN_AI_KEY} from "../config/secrets";

const { Configuration, OpenAIApi } = require("openai");



const configuration = new Configuration({
    apiKey: OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);


// Deprecated
export const GenerateTextServiceOld = {

    /**
     *
     * @param usersTranscriptSentence - string, may be incorrect
     * @returns {Promise<void>}
     */
    async getWattUsageEstimate(habitAction) {

        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            maxTokens: 3,
            prompt: "For each habit below, estimate the watt usage doing that for 10 minutes.\n\nHabit: drink coffee\nWatt usage: 150\n" +
                "Habit: gaming\nWatt usage: 30\n" +
                "Habit: " + habitAction +"\nWatt usage:"
        });
        return parseInt(completion.data.choices[0].text.strip(' ')) // should be a number
    }

}
