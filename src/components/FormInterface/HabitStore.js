import {observable, action, makeAutoObservable, runInAction} from "mobx";
import {createContext} from "react";
import {CarbonUsageService} from "../../services/CarbonUsage";
import {GenerateTextService} from "../../services/GenerateText";

export default createContext(new class Habit {

    constructor() {
        makeAutoObservable(this);
    }

    routineItems = []; // each item is { 'description': str, 'timeRepresentation': { 'hour': int, 'second': int } }
    results = []

    addRoutineItem = (item) => {
        this.routineItems.push(item)
    }

    setResults = (results) => {
        this.results = results
    }

    getSortedResults = () => {
        return this.results.slice().sort((a, b) => a.marginalGainPercentage > b.marginalGainPercentage)
    }

    processIntoResults = (onDone) => {
        console.log('Processing results.')
        runInAction(async () => { // Get Async context
            const waitUsage = results.map((item) => item.watt)
            const emojis = results.map((item) => item.emoji)

        this.results = await Promise.all(this.routineItems.map(async (item, ind) => {
            const watts = wattUsage[ind]
            const emoji = emojis[ind]
            const usage = await CarbonUsageService.getUsageOfKW(item.timeRepresentation, Math.ceil(watts/1000))
            const best = await CarbonUsageService.getBestUsageOfKW(item.timeRepresentation, Math.ceil(watts/1000))
            // Could also await StableDiffusion or emoji representation here.
            // item = { 'description': 'Drink coffee', 'timeRepresentation': { 'hour': 11, 'second': 60 } }

            // percentageDifference
            // If positive, the saving from applying at the optimal time.
            // Can be 0 if user is at the optimal time already.
            // Can be up to 1 (representing 100%)

            // best usually lower than usage.
            // 400 / 600 = 0.66 = 33% saving from peak.
            const percentageDifference =  1 - (best / usage)

            return({
                ...item, // description + timeRepresentation
                'usage': usage,
                'watts': watts,
                'emoji': emoji,
                'percentageDifference': percentageDifference
            })

        }))
        onDone()
        })
    }

})
