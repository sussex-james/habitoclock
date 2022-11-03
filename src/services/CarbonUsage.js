

export const CarbonUsageService = {

    /**
     *
     * @param time object with { hour, minute } which are both numbers that are .toString()-able
     * @param kwAmount will be multiplied by "rating" to get impact, defualts to 1.
     *
     * "rating" returned by the api is grams of carbon used per KW hour.
     *
     * @returns {Promise<void>}
     */
    async getUsageOfKW(time, kwAmount=1) {
        console.log('Carbon Usage at time: ', time);
        console.log('For KW amount: ', kwAmount);
        // rpely with it.
        const startTime = '2022-03-01T' + time.hour + '%3A' + time.minute + '%3A00Z';

        const url = 'https://carbon-aware-api.azurewebsites.net/emissions/bylocations/best?location=eastus&time=' + startTime;

        fetch(url).then((data) => {
            console.log(data[0]['rating']);
            const dirtyCarbonUsageInGramsAtThisTime = data[0]['rating'] * kwAmount;
            // use variable to be explicit about the value.
            return dirtyCarbonUsageInGramsAtThisTime
        }).catch((e) => {
            console.error(e);
            return 450 * kwAmount // Safe default.
        })

    }
}

/**
 Running the full API on docker locally is a bit harder than calling API directly for demo purposes.


 https://carbon-aware-api.azurewebsites.net/emissions/bylocations/best?location=eastus&time=2022-03-01T19%3A30%3A00Z&toTime=2022-03-01T20%3A30%3A00Z

 for example returns useful information.

 uksouth is right location.

 rating = grams per kilowatt hour

 03/01 --> 19:30<-->35 --> 562.45

 01/01 --> 20:30<-->50 --> 556

 # AKA, running at 20:30 is better for the environment.

 03/01 --> 13:30<-->50 --> 630

 # AKA, running at 13:30 is bad for the environment. The difference is 12%(!)

 03/01 --> 09:30 ----> 557

 # These times suggest to me that the timezone is UTC.

 ## in UK south:

 08:20 --> 425
 11:30 --> 486
 12:30 --> 484
 13:30 --> 392
 14:30 --> 445
 15:30 --> 479
 16:30 --> 467

 In the UK, you could use 25% less carbon by having your coffee at 13:30, not 12:30 on weekdays(!)

 (Weekend day - 5th of March 2022)
 08:00 --> 397
 11:00 --> 383
 12:00 --> 383
 14:00 --> 449
 18:00 --> 446

 # Cook roast dinner on Sunday
 06:00 --> 359
 11:30 --> 375

 Affirms that Sunday is the ideal day for Roast Dinners.

 Reduce your footprint(all kinds)

 Time your Tea.


  example locations are here https://github.com/Green-Software-Foundation/carbon-aware-sdk/issues/175

 example of outputs:
 [{"location":"UK","time":"2022-03-05T11:50:00+00:00","rating":396.89332375000004,"duration":"00:05:00"}, ...]

 for purpose of demo we just use eastus for everything

 to work out the relative time which is worse and use it as 24 hour clock relative to users time zone

 fully fledged application should first calculate users region.

 **/
