# How to run this
Get a copy of the `secrets.js` file for /config.
Then run `npm start` (it will render without secrets.js, but will break at the Form point)


# Rough code overview
- Everything frontend, no backend.
- Orgnaised into `components` (React + Business logic) and `services` (to connect to APIs)
- Within components users entry via `Entry.js`, we then procedurally put them through 3 stages to
1) Gather habit information [Files beginning with "Habit"]
2) Calculate watt usage at times they enter ["FetchResults", uses Services]
3) Display results page ["Results" - not done yet]

# Libraries
- Chokra for UI (Just like Boostrap)
- Mobx for state storage (like Redux/Typescript classes)

# Goal
Build a simple app to help you make bettre habit choices. it should motivate you by the positive impact you can have on the environment.
If there is time, wrap it in an expo app to send notifications (as of 16:35 thursday, there isn't enough time for that I think)



# Judging Criteria:
The criteria are about innovation, being polished and using the Carbon Aware API.

There is an additional prize for most insightful. I think this is a good one to aim for.

Why? - because a lot of people don't know that when they drink coffee can mean as much as 25% more usage of Carbon!

We want to make it easy for anybody to establish their carbon usage. To gain that insight.

What makes it insightful is that because we use large language models to estimate usage generically,
we can estimate usage for most kinds of habit, not just have a preopulated list.

That gives users a lot more freedom than other tools!


# How we built it
Tutorials included
- https://ordinarycoders.com/blog/article/react-chakra-ui
(For the chat UI)
- Documentation of Open AI
- Documentation of Banana.dev (for fast GPUs, enables creative work)
- Documentation in CarbonHack.
