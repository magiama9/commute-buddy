# COMMUTE\buddy\
Main project work completed over the course of 5 working days in a team of four including Sam Randels, Khalil Hall, Aya Yoshida, and Ken Shiraishi.

## APPLICATION BASICS
![Demo Gif](https://github.com/magiama9/group-project-01/blob/master/assets/demo/project-demo-gif.gif)
This is a navigation application that provides an interactive map and turn-by-turn directions. The user has the option of viewing multiple different routes based on mode of transport and traffic. Based on the route a user inputs, the application calculates fuel usage and thus fuel cost, allowing a user to make informed financial decisions regarding trips and commuting. The user is also able to see the health benefits it they do choose to take an alternate mode of transport such as walking or cycling.

### USER STORIES
As commuters in a large city, we have options for method of transport; often the best method of transport cannot be determined solely on time to destination. We want to be able to see both how long a trip will take us via various modes of transport and how much it will cost us in fuel to drive. With that information, we can decide whether it makes more sense to drive, walk, cycle, or take public transport.

As road trippers, costs such as lodging and food are often easy to plan around; however, fuel and driving related costs often go unaccounted for. By getting not only directions, but fuel costs, we can more accurately budget for our road trip and focus on enjoying ourselves.

As a business owner, estimating costs for myself and my employees can be a gargantuan task, especially if employees are able to expense transportation costs to the business. By being able to plan for monthly and yearly expenses, I can more efficiently allocate resources and also estimate what deductions are available on my taxes to save me even more money.

## MINIMUM VIABLE PRODUCT SPECS
* Functional display of map/navigation
  * Turn By Turn Directions
  * Time to Destination
  * User Can Input Their Start Location
  * User Can Input a Destination
* Gas Price Calculator
  * User can input the MPG of their car
  * User can see how many gallons of gasoline the trip will take
  * App will calculate a total cost of the trip in gasoline by accessing nationwide gas prices.

## TECHNICAL

### CALCULATIONS AND DATA SOURCES

#### N.B. All calculations are estimates using the data and methodology listed below. Calculation results should not be considered financial or health advice, and your individual results may vary from what is shown below.

* Costs
    * Fuel Cost is evaluated as ( ( ( trip distance ) / ( miles per gallon ) ) * ( cost per gallon in USD) ) * ( number of trips)
    * Running Cost is evaluated using the IRS guidelines for allowable expenditures per mile. This is also the standard rate most employers use to reimburse their employees. As of 2020, that figure is $0.58 per mile driven.
        * Running Cost is evaluated as ( trip distance ) * ( IRS mileage rate ) * ( number of trips )
* Calories
    * Weights used are the most recent average weights for individuals in the United States.
    * Calories are evaluated differently for walking and cycling. Cycling burns an average of 1.9 calories per pound per hour cycled and average cycling speed is 12 mph. Walking burns an average of 2 calories per pound per hour walked and average walking speed is 3.5 mph.
        * Cycling calories are evaluated as ( ( weight ) * ( calories per pound per hour cycled ) / ( average cycling speed ) ) * ( cycling distance)
        * Walking calories are evaluated as ( ( weight ) * ( calories per pound per hour walked ) / ( average walking speed ) ) * ( walking distance)
        * Pounds lost are calculated as ( calories burned ) / ( 3500 )

### LIBRARIES AND FRAMEWORKS 
* JQuery --- Used to traverse/select/modify the DOM
* MapBox GL --- Used for rendering the map utilizing openstreetmap data and WebGL
    * MapBox GL Directions Plugin --- Used for translating MapBox API data to user readable navigation information. Also handles user input and geolocator functionality(e.g. Turning 1600 Pennsylvania Ave into a set of coordinates readable by the MapBox API)
* MapBox API --- Used to generate maps, directions, and distance.
* Gas Prices API via Current API--- Used to get current nationwide gas prices
* Bulma --- responsive, mobile-first CSS framework
    * Bulma-Switch extension --- styles checkbox as a toggle switch. Compiled from source using Sass and Dart.

## MVP TO-DO
* ~~Wireframe front-end~~
* ~~Make MapBox Calls~~
* ~~Make Gas Price Calls~~
* ~~Display map~~
* ~~Take User Input~~
  * ~~Origin~~
  * ~~Destination~~
  * ~~Car MPG~~
  * ~~How often is the route traveled?~~
* ~~Display navigation/directions~~
* ~~Calculate~~
  * ~~Fuel Used~~
  * ~~Price of Fuel Used~~
* ~~Display information to user~~
  * ~~Map~~
  * ~~Directions~~
  * ~~Gas Cost~~

## WISHLIST TO-DO

* Calculate gas prices dynamically based on the time spent in each state for which gas price data is available
* Find the nearest gas station
* Find the price of gas at the nearest gas station
* Let the user select their car make and model to automatically find the MPG information
* ~~Calculate commute costs daily, weekly, monthly, and yearly for driving~~
  * Calculate comparable commute costs using DC Metro/DC MetroBus
* ~~Calculate calories burned for walking and cycling~~
  * ~~Calculate pounds burned/weight lost over period of time~~
* ~~Calculate total running cost over commuting period (using IRS cost/mile?)~~
