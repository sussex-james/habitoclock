
const habitAction = ''
const prompt =  "For each habit below, estimate the watt usage doing that for 10 minutes.\n\nHabit: drink coffee\nWatt usage: 150\n" +
    "Habit: gaming\nWatt usage: 30\n" +
    "Habit: " + habitAction +"\nWatt usage:"

// parseInt force


export const GenerateTextService = {

    /**
     *
     * @param usersTranscriptSentence - string, may be incorrect
     * @returns {Promise<void>}
     */


    async getWattUsageEstimate(habitAction) {
        return fetch('quizscribe.com:3002/hackathonGetWatts').then((resp) => resp.json().watts)
    }

}
