import {observable, action, makeAutoObservable, runInAction} from "mobx";
import {createContext} from "react";
import {CarbonUsageService} from "../../services/CarbonUsage";
import {GenerateTextService} from "../../services/GenerateText";
import {WattUsageAndEmojisService} from "../../services/WattUsageAndEmojis";

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
            const results = await WattUsageAndEmojisService.getWattUsageAndEmojis(this.routineItems.map((item) => item.description))
            console.log('results were; ', results)
            const wattUsage = results.map((item) => item.watts)
            const emojis = results.map((item) => item.emoji)

            const changeHours = (time, change) => {
                console.log('Output: Changing hours of time: ', time, ' by changing: ', change, ' with specific hour: ', time.hour)
                const newTime = {...time, hour: ((parseInt(time.hour) + parseInt(change)) % 24)}
                if (newTime.hour.toString().length === 1) {
                    // convert to 2 digit format as timezone requires that.
                    newTime.hour = '0' + newTime.hour.toString()
                }
                console.log('Output: Time of ', newTime)
                return (newTime)
            }

        this.results = await Promise.all(this.routineItems.map(async (item, ind) => {
            const watts = wattUsage[ind]
            const emoji = emojis[ind]
            const usage = await CarbonUsageService.getUsageOfKW(item.timeRepresentation, Math.ceil(watts/1000))

            // todo: Refactor into loop
            const hourModifications = [-3, -1, +1, +3]
            // we need to destructure item.timeRepresentation so it does not pass by reference. And changeHours to safely % 24 into 24 hour form.
            const minus3 = await CarbonUsageService.getUsageOfKW(changeHours({...item.timeRepresentation}, hourModifications[0]), Math.ceil(watts/1000))
            const minus1 = await CarbonUsageService.getUsageOfKW(changeHours({...item.timeRepresentation}, hourModifications[1]), Math.ceil(watts/1000))
            const plus1 = await CarbonUsageService.getUsageOfKW(changeHours({...item.timeRepresentation}, hourModifications[2]), Math.ceil(watts/1000))
            const plus3 = await CarbonUsageService.getUsageOfKW(changeHours({...item.timeRepresentation}, hourModifications[3]), Math.ceil(watts/1000))

            const alternates = [minus3,  minus1, plus1, plus3]

            console.log('Output alternates: ', alternates)

            let indexOfArgMin = alternates.indexOf(Math.min(...alternates));

            const best = alternates[indexOfArgMin]

            const bestTime = (parseInt(item.timeRepresentation.hour) + parseInt(hourModifications[indexOfArgMin])).toString() + ':00'

            //const best = await CarbonUsageService.getBestUsageOfKW(item.timeRepresentation, Math.ceil(watts/1000))
            // Could also await StableDiffusion or emoji representation here.
            // item = { 'description': 'Drink coffee', 'timeRepresentation': { 'hour': 11, 'second': 60 } }

            // percentageDifference
            // If positive, the saving from applying at the optimal time.
            // Can be 0 if user is at the optimal time already.
            // Can be up to 1 (representing 100%)

            // best usually lower than usage.
            // 400 / 600 = 0.66 = 33% saving from peak.
            let percentageDifference =  1 - (best / usage)
            console.log('Output best /usage: ', best, usage)
            console.log('Output hours change: ', changeHours({hour: 23, minute: 15}, +1))

            if (percentageDifference < 0) {
                percentageDifference = 0
            }

            const output = {
                ...item, // description + timeRepresentation
                'name': item.description,
                'usage': usage,
                'watts': watts,
                'best': best,
                'bestTime': bestTime,
                'emoji': emoji,
                'percentageDifference': percentageDifference,// percentageDifference
            }

            console.log('Output was: ', output)

            return(output)

        }))
        onDone()
        })
    }

})
