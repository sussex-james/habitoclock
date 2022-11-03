
export const WattUsageAndEmojisService = {

    async getWattUsageAndEmojis(topics) {
        const remoteUrl = 'secret'
        return fetch(remoteUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topics: topics})
        }).then((resp) => resp.json().results)
    }
}
