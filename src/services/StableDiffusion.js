import {BANANA_API_KEY, BANANA_STABLE_MODEL_KEY} from "../config/secrets";

const banana = require('@banana-dev/banana-dev');



export const StableDiffusionService = {

    async getStableDiffusionBase64Image(prompt_text) {
        console.log('Getting image')
        const modelParameters = {
            "prompt": prompt_text
        };

        const out = await banana.run(BANANA_API_KEY, BANANA_STABLE_MODEL_KEY, modelParameters)

        return out
    }

}
