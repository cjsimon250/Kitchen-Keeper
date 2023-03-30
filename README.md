(View Raw will give you the markdown that you can copy to your repos!)

![MIT LICENSE](https://img.shields.io/github/license/cjsimon/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/cjsimon/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/cjsimon/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/cjsimon/the_marketplace.svg?style=social)

# PROJECT NAME

## Description

_Duration: 2 Week Sprint_

Kitchen Keeper is a functional prototype for a restaraunt inventory management application. For Kitchen Keeper to perform to the best of it's abilities, the user will be required to first upload all of their current iventory information. For example, this application will need every item name, the current quantity in stock, as well as the minimum stock desired for each item (when an item is below this quantity the user will be noitified). Next, the user will upload all of the dishes on their menu as well as the quantity and name of the previously added inventory items that are in each dish. Kitchen Keeper also allows users to upload the orders that they get from their distributer and track that data as well as restock your current inventory. Due to the way Kitchen Keeper is built, restaraunt owners or managers will need to upload their daily sales per menu item at the end of each day. This allows for automatated inventory mangament, the ability to see a variety of sales data, and the ability to see how much food is being wasted by how far off the current stock is in the application versus how much the user actually has.

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](https://kitchenkeeper.herokuapp.com/)

## Screen Shots

![Alt text](./documentation/images/dashboard.png?raw=true "User Dashboard")
![Alt text](./documentation/images/menuInventory.png?raw=true "User's Invetnory & Menu")

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [Postgres](https://www.postgresql.org/download/)

## Installation

1. Create a database named `kitchen-keeper`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
3. Create a `.env` file and set "SERVER_SESSION_SECRET" to whatever you like as long as it is longer than 8 characters
4. Open up your editor of choice and run an `npm install`
5. Run `npm run server` in your terminal
6. Run `npm run client` in your terminal
7. The `npm run client` command will open up a new browser tab for you!

## Usage

1. As a new user, you will log in and upload all of your current menu and inventory in stock. The data needed consists of the current quantities of all inventory items in stock, the user's minimum desired stock, as well as how much of each inventory item is in every dish.
2. If the user has access to past sales data they can upload how much of each Menu Item was sold on a given day and view sales metrics over the last year as well as last seven days.
3. Users will also be able to track and add orders they recieve from suppliers so that they can restock their inventory.
4. At the end of every day, the user will upload how much of each menu item was sold and their current inventory will be adjusted accordingly
5. Using the notifications about low quantity items, the user is able to see what items they need to restock so that their is no need to take inventory manually

## Built With

- [![HTML5][html]][html-url]
- [![CSS3][css]][css-url]
- [![JavaScript][javascript]][javascript-url]
- [![React][react.js]][react-url]
- [![Redux-Saga][redux-saga]][redux-saga-url]
- [![Express][express.js]][express-url]
- [![Node][node.js]][node-url]
- [![PostgreSQL][postgres]][postgres-url]
- [![MUI][mui]][mui-url]
- [![Chart.js][chart.js]][chart-url]

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgement

Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. Special thanks to Dane Smith, Key Clark, Edan Schwartz, and all of the Amethyst Cohort.

## Support

If you have suggestions or issues, please email me at [cjsimon615@gmail.com](www.google.com)

<!-- MARKDOWN LINKS & IMAGES -->

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[javascript]: https://img.shields.io/badge/JavaScript?style=for-the-badge&logo=Javascript&logoColor=F7DF1E
[javascript-url]: https://www.javascript.com/
[mui]: https://img.shields.io/badge/MUI?style=for-the-badge&logo=MUI&logoColor=007FFF
[mui-url]: https://mui.com/
[redux-saga]: https://img.shields.io/badge/Redux-Saga?style=for-the-badge&logo=Redux-Saga&logoColor=999999
[redux-saga-url]: https://redux-saga.js.org/\
[express.js]: https://img.shields.io/badge/Express?style=for-the-badge&logo=Express&logoColor=000000
[express-url]: https://expressjs.com/
[node.js]: https://img.shields.io/badge/Node.js?style=for-the-badge&logo=Node.js&logoColor=339933
[node-url]: https://nodejs.org/en
[css]: https://img.shields.io/badge/CSS3?style=for-the-badge&logo=CSS3&logoColor=1572B6
[css-url]: https://www.w3.org/Style/CSS/Overview.en.html
[html]: https://img.shields.io/badge/HTML5?style=for-the-badge&logo=HTML5&logoColor=E34F26
[html-url]: https://html.spec.whatwg.org/multipage/
[postgres]: https://img.shields.io/badge/PostgreSQL?style=for-the-badge&logo=PostgreSQL&logoColor=4169E1
[postgres-url]: https://www.postgresql.org/
[chart.js]: https://img.shields.io/badge/Chart.js?style=for-the-badge&logo=Chart.js&logoColor=FF6384
[chart-url]: https://www.chartjs.org/
