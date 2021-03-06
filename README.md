[![Build Status](https://travis-ci.com/nyu-software-engineering/spring-2020-frugal-eye.svg?branch=master)](https://travis-ci.com/nyu-software-engineering/spring-2020-frugal-eye)

# Sprouts

## Story behind Sprouts - copied from proposal
Growing up as a kid, one of the things my parents used to always say to me when I asked to eat out was "we have food at home" -- somehow they could always find a way to whip up a meal out of whatever leftover ingredients we had in our kitchen. My project proposal is to create [an application] for people like me who don't have this skill. Users will be able to input whatever ingredients they have readily available and the goal of the system is to output recipes they can make with the food they have at home.

I would like the [application] to be tailored towards different types of cuisines to address diversified needs, as this kind of [service] does not yet exist for non-American food. Another way to make this more unique than existing programs is to allow users to also input how much time they have to make a meal, or how many servings they want to make. This system would be geared towards people who want to save money by eating at home and people who want to learn how to cook new dishes. Gathering recipes would probably be the first step in this project, so a solution I thought would be feasible for a group project would be to create a web crawler to collect recipes from popular food websites.

### Our Vision
We plan to create an application that will allow users to input the current ingredients they have available and receive a list of recipes they could create with the ingredients they have available. They can then save those recipe and the recipe will be added to their account for reuse. Each recipe will come with the name of the dish, a photo of the dish, list of ingredients and instructions for cooking. 

### Link to Invision Prototype
[Prototype](https://projects.invisionapp.com/share/NDW89AUW5U3#/screens/407506295)

## How to contribute to the project
[Contributing MD](https://github.com/nyu-software-engineering/spring-2020-frugal-eye/blob/master/CONTRIBUTING.md)

## Build and Test
### Running Sprouts from Commandline
Navigate to where the Sprouts folder is stored on your machine
In one tab, navigate to the back end and run the server

```$ cd back-end```

```$ npm start```

In another tab, navigate to the front end and run

```$ cd front-end```

```$ npm start ```

A message will display saying that localhost:3000 is not available and ask if you want to use a different address instead. Type `y` for yes. 

### Testing Sprouts
To test sprouts, navigate to Sprouts in the commandline

Navigate to the back end ```cd back-end``` 

Then run ```npm test```


## Relevant Reading
[Downfall of a major mealkit service provider](https://pitchbook.com/news/articles/recipe-for-disaster-the-meteoric-rise-and-ongoing-demise-of-blue-apron)    
While the mealkit service sector may seem similar to the application we plan to create, it is important to remember that we only plan on providing recipes based on the ingredients users have, not recipes to meals the users will create with the ingredients that are also provided. 
